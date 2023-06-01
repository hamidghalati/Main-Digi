<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    protected $table = 'order_products';

    protected $fillable = ['order_id', 'product_id', 'color_id', 'warranty_id', 'product_price1',
        'product_price2', 'product_count', 'seller_id', 'preparation_time', 'send_status', 'time'
        , 'seller_read', 'commission', 'tozihat', 'stockroom_id'];

    public function getProduct()
    {
        return $this->hasOne(ProductsModel::class, 'id', 'product_id')
            ->select(['id', 'title', 'image_url', 'cat_id', 'brand_id']);
    }

    public function getColor()
    {
        return $this->hasOne(ColorModel::class, 'id', 'color_id')
            ->withDefault(['name' => '', 'code' => 'fff']);
    }

    public function getWarranty()
    {
        return $this->hasOne(WarrantyModel::class, 'id', 'warranty_id')
            ->withDefault(['name' => '']);
    }

    public function getSeller()
    {
        return $this->hasOne(Seller::class, 'id', 'seller_id')
            ->select(['id', 'brand_name'])
            ->withDefault(['brand_name' => env('SHOP_NAME')]);
    }

    public function getOrder()
    {
        return $this->hasOne(Order::class, 'id', 'order_id');
    }

    public function getStockroom()
    {
        return $this->hasOne(Stockrooms::class, 'id', 'stockroom_id');
    }

    public static function setReturnProduct($count, $request, $orderProduct)
    {
        $user_id = $request->user()->id;
        $time = time();
        if ($count == $orderProduct->product_count) {
            DB::beginTransaction();
            try {

                $orderProduct->send_status = -1;
                $orderProduct->tozihat = $request->get('tozihat');
                $orderProduct->stockroom_id = $request->get('stockroom_id', 0);
                $orderProduct->update();
                self::set_sale($orderProduct);

                if ($orderProduct->stockroom_id > 0) {
                    self::addStockroom($orderProduct,$count,$request,$orderProduct->stockroom_id);
                }


                DB::commit();
                return  'ok';
            } catch (\Exception $exception) {
                DB::rollBack();
                return  'error';
            }
        } else {
            DB::beginTransaction();
            try {
                $product_count = $orderProduct->product_count - $count;
                $commission = $orderProduct->commission;
                if ($commission > 0) {
                    $commission = ($commission / $orderProduct->product_count) * $product_count;
                }
                $new_record = $orderProduct->replicate();
                $new_record->product_count = $product_count;
                $new_record->commission = $commission;
                $new_record->save();

                $orderProduct->send_status = -1;
                $orderProduct->tozihat = $request->get('tozihat');
                $orderProduct->product_count = $count;
                $orderProduct->stockroom_id = $request->get('stockroom_id', 0);
                $orderProduct->update();

                self::set_sale($orderProduct);

                if ($orderProduct->stockroom_id > 0) {
                    self::addStockroom($orderProduct,$count,$request,$orderProduct->stockroom_id);
                }

                DB::commit();
                return  'ok';
            } catch (\Exception $exception) {
                DB::rollBack();
                return  'error';
            }
        }
    }

    public static function set_sale($orderProduct, $type = 'minus')
    {
        $time = $orderProduct->time;
        $y = tr_num(jdate('Y', $time));
        $m = tr_num(jdate('n', $time));
        $d = tr_num(jdate('j', $time));

        $product_price = $orderProduct->product_price2 * $orderProduct->product_count;
        if ($orderProduct->id > 0) {
            if ($type == 'minus')
            {
                DB::table('sellers')->where('id', $orderProduct->seller_id)->decrement('total_commission', $orderProduct->commission);
                DB::table('sellers')->where('id', $orderProduct->seller_id)->decrement('total_price', $product_price);
            }
            else{
                DB::table('sellers')->where('id', $orderProduct->seller_id)->increment('total_commission', $orderProduct->commission);
                DB::table('sellers')->where('id', $orderProduct->seller_id)->increment('total_price', $product_price);

            }
            set_seller_sale_statistics($product_price, $orderProduct->commission, $y, $m, $d, $orderProduct->seller_id,$type);

        }

        product_sale_statistics($y, $m, $d, $orderProduct->commission, $product_price, $orderProduct->product_id, $orderProduct->seller_id,$type);
        set_overall_statistics($y, $m, $d, $product_price, $orderProduct->commission,$type);
    }

    public static function addStockroom($orderProduct,$count,$request,$stockroom_id)
    {
        $product_warranty = ProductWarranty::where([
            'product_id' => $orderProduct->product_id,
            'warranty_id' => $orderProduct->warranty_id,
            'color_id' => $orderProduct->color_id,
            'seller_id' => $orderProduct->seller_id,
        ])->withTrashed()->first();
        if ($product_warranty) {
            $list = $product_warranty->id . '_' . $count;
            $result=Stockrooms::add_product($request,$list,$stockroom_id);
        } else {

        }
    }

    public static function RemoveReturnProduct($request, $orderProduct)
    {
        $user_id = $request->user()->id;
        $time = time();
        DB::beginTransaction();
        $stockroom_id = $orderProduct->stockroom_id;
        try {


            $orderProduct->send_status = 6;
            $orderProduct->tozihat = $request->get('tozihat');
            $orderProduct->stockroom_id = 0;
            $orderProduct->update();
            self::set_sale($orderProduct,'plus');

            if ($stockroom_id > 0) {
                $count=$orderProduct->product_count;
                self::addStockroom($orderProduct,$count,$request,$stockroom_id);
            }


            DB::commit();
            return  'ok';
        } catch (\Exception $exception) {
            DB::rollBack();
            return  'error';
        }

    }

    public static function getList($request){
        $product_title=$request['string'];
        $string='?';
        $return_product_list=self::with(['getProduct','getColor','getWarranty','getSeller','getStockroom']);

        if (!empty($product_title))
        {
            define('product_title',$product_title);
            $return_product_list=$return_product_list->whereHas('getProduct',function ($query){
                $query->where('title','like','%'.product_title.'%');
            });
        }
        else{
            $return_product_list=$return_product_list->whereHas('getProduct');
        }

        $return_product_list= $return_product_list->where('send_status',-1)->orderBy('id','DESc')->paginate(10);
        $return_product_list->withPath($string);
        return $return_product_list;
    }

}
