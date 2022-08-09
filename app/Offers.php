<?php

    namespace App;

    use App\Jobs\IncredibleOffers;
    use DB;
    use Validator;

    class Offers
    {
        public function add($request,$productWarranty)
        {
            $Validator=Validator::make($request->all(),[
                'price1'=>'required|numeric',
                'price2'=>'required|numeric',
                'product_number'=>'required|numeric',
                'product_number_cart'=>'required|numeric',
                'date1'=>'required',
                'date2'=>'required'
            ],[],[
                'price1'=> 'هزینه محصول',
                'price2'=> 'هزینه محصول برای فروش',
                'product_number'=>'تعداد موجودی (برای فروش)',
                'product_number_cart'=>'تعداد قابل سفارش در سبد خرید',
                'date1'=>'تاریخ شروع',
                'date2'=>'تاریخ پایان'
            ]);
           if ($Validator->fails())
           {
               return $Validator->errors();
           }
           else
           {
               $date1=$request->get('date1');
               $date2=$request->get('date2');
               $offers_first_time=getTimestamp($date1,'first');
               $offers_last_time=getTimestamp($date2,'last');
               $row=DB::table('old_price')->where('warranty_id',$productWarranty->id)->first();
               if (!$row)
               {
                   $this->addNewPriceRow($productWarranty,$request);

               }
               else
               {

                   $this->updatePriceRow($row,$request,$productWarranty);
               }

               $productWarranty->offers_first_date=$date1;
               $productWarranty->offers_last_date=$date2;
               $productWarranty->offers_first_time=$offers_first_time;
               $productWarranty->offers_last_time=$offers_last_time;
               $productWarranty->offers=1;

               if ($productWarranty->update($request->all()))
               {
                   $second=$offers_last_time-time()+1;
                   IncredibleOffers::dispatch($productWarranty->id)->delay(now()->addSecond($second));
                   add_min_product_price($productWarranty);
                   $product=ProductsModel::where('id',$productWarranty->product_id)->select(['price','id','status'])->first();
                   update_product_price($product);
                   return 'ok';
               }
               else
               {
                   return[ 'error'=>true];
               }
           }

        }

        public function addNewPriceRow($productWarranty,$request)
        {
            $n=$productWarranty->product_number-$request->get('product_number');
            if ($n<=0)
            {
                $n=0;
            }
            $insert_id=DB::table('old_price')
                ->insertGetId([
                    'warranty_id'=>$productWarranty->id,
                    'price1'=>$productWarranty->price1,
                    'price2'=>$productWarranty->price2,
                    'product_number'=>$n,
                    'product_number_cart'=>$productWarranty->product_number_cart,
                    'number_product_sales'=>$request->get('product_number'),

                ]);
        }

        public function updatepriceRow($row,$request,$productWarranty)
        {
            $n=$row->product_number;
            if ($row->number_product_sales > $request->get('product_number'))
            {
                $n1=$row->number_product_sales-$request->get('product_number');
                $n=$n+$n1;
            }
            else
            {
                $n1=$request->get('product_number')-$row->number_product_sales ;
                $n=$n-$n1;
            }
            DB::table('old_price')->where(['warranty_id'=>$productWarranty->id])
                ->update([
                    'number_product_sales'=>$request->get('product_number'),
                    'product_number'=>$n
                ]);
        }

        public function remove($productWarranty)
        {
            $old_price=DB::table('old_price')->where('warranty_id',$productWarranty->id)->first();
            if ($old_price)
            {
                $productWarranty->price1=$old_price->price1;
                $productWarranty->price2=$old_price->price2;
                if ($old_price->product_number>0)
                {
                    $productWarranty->product_number= $productWarranty->product_number+$old_price->product_number;
                }
            }
            $productWarranty->offers=0;
            $productWarranty->update();
            DB::table('old_price')->where('warranty_id',$productWarranty->id)->delete();

            add_min_product_price($productWarranty);
            $product=ProductsModel::where('id',$productWarranty->product_id)->select(['price','id','status'])->first();
            update_product_price($product);

            return $productWarranty;
        }


    }
