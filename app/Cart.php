<?php
namespace App;
use Session;

class Cart
{

    public static function add_cart($data)
    {
        $product_id=array_key_exists('product_id',$data) ? $data['product_id'] : 0;
        $color_id=array_key_exists('color_id',$data) ? $data['color_id'] : 0;
        $warranty_id=array_key_exists('warranty_id',$data)?$data['warranty_id'] : 0;
        $s_c=$warranty_id.'_'.$color_id;
        $cart=Session::get('cart',array());
        if (array_key_exists($product_id,$cart))
        {
            $product_data=$cart[$product_id]['product_data'];
            if (array_key_exists($s_c,$product_data))
            {
                $count=$cart[$product_id]['product_data'][$s_c]+1;
                if (self::check($product_id,$color_id,$warranty_id,$count))
                {
                    $cart[$product_id]['product_data'][$s_c]++;
                }
            }
            else
            {
                $cart[$product_id]['product_data'][$s_c]=1;
            }
        }
        else
        {
            $cart[$product_id]=[
              'product_data'=>[$s_c=>1]
            ];
        }

        Session::put('cart',$cart);
//        print_r(Session::get('cart',array()));
    }

    public static function check($product_id,$color_id,$warranty_id,$count)
    {
        $ProductWarranty=ProductWarranty::where([
            'warranty_id'=>$warranty_id,
            'product_id'=>$product_id,
            'color_id'=>$color_id

        ])->first();
        if ($ProductWarranty && $ProductWarranty->product_number>=$count && $ProductWarranty->product_number_cart>=$count)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public static function getCartData()
    {

        $cart=Session::get('cart',array());
        $product_id=array();
        $color_id=array();
        $warranty_id=array();
        $data=array();
        $cart_product_number=array();
        $i=0;
        foreach ($cart as $key=>$value)
        {
            foreach ($value['product_data'] as $key2=>$value2)
            {
                $a=explode('_',$key2);
                if (sizeof($a)==2)
                {
                    $product_id[$key]=$key;
                    $color_id[$a[1]]=$a[1];
                    $warranty_id[$a[0]]=$a[0];

                    $row=ProductWarranty::where([
                        'product_id'=>$key,
                        'color_id'=>$a[1],
                        'warranty_id'=>$a[0],
                    ])->first();


                    if ($row)
                    {
                        $data[$i]=$row;
                        $i++;
                        $k=$key.'_'.$a[1].'_'.$a[0];
                        $cart_product_number[$k]=$value2;
                    }

                }
            }
        }



        $products=ProductsModel::whereIn('id',$product_id)->select(['id','title','image_url'])->get();
        $colors=ColorModel::whereIn('id',$color_id)->get();
        $warranties=WarrantyModel::whereIn('id',$warranty_id)->get();



        $total_price=0;
        $cart_price=0;
        $cart_data=array();
        $j=0;

        foreach ($data as $k=>$v)
        {
            $product=getCartProductData($products,$v->product_id);
            $color=getCartColorData($colors,$v->color_id);
           $warranty=getCartWarrantyData($warranties,$v->warranty_id);
           $n=$v->product_id.'_'.$v->color_id.'_'.$v->warranty_id;
           $product_number=array_key_exists($n,$cart_product_number)? $cart_product_number[$n]:0;
           if ($product  && $warranty && $product_number>0)
           {
               $cart_data['product'][$j]['product_title']=$product->title;
               $cart_data['product'][$j]['product_image_url']=$product->image_url;
               $cart_data['product'][$j]['warranty_name']=$warranty->name;
               if ($color)
               {
                   $cart_data['product'][$j]['color_name']=$color->name;
                   $cart_data['product'][$j]['color_code']=$color->code;
               }
               $cart_data['product'][$j]['price1']=$v->price1;
               $cart_data['product'][$j]['price2']=$v->price2;
               $cart_data['product'][$j]['product_number_cart']=$v->product_number_cart;
               $cart_data['product'][$j]['product_count']=$product_number;
               $total_price+=$v->price1;
               $cart_price+=$v->price2;

               $j++;
           }
        }
        $cart_data['total_price']=$total_price;
        $cart_data['cart_price']=$cart_price;
         return $cart_data ;
    }
}
