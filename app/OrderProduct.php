<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    protected $table='order_products';

    protected $fillable=['order_id','product_id','color_id','warranty_id','product_price1',
        'product_price2','product_count','seller_id','preparation_time','send_status','time'
        ,'seller_read','commission','tozihat','stockroom_id'];

    public function getProduct()
    {
        return $this->hasOne(ProductsModel::class,'id','product_id')
            ->select(['id','title','image_url','cat_id','brand_id']);
    }

    public  function getColor()
    {
        return $this->hasOne(ColorModel::class,'id','color_id')
            ->withDefault(['name'=>'','code'=>'fff']);
    }

    public  function getWarranty()
    {
        return $this->hasOne(WarrantyModel::class,'id','warranty_id')
            ->withDefault(['name'=>'']);
    }

    public function getSeller()
    {
        return $this->hasOne(Seller::class,'id','seller_id')
            ->select(['id','brand_name'])
            ->withDefault(['brand_name'=>env('SHOP_NAME')]);
    }

    public function getOrder()
    {
       return $this->hasOne(Order::class,'id','order_id');
    }

    public static function setReturnProduct($count,$request,$orderProduct)
    {
        $user=$request->user()->id;
        $time=time();
        if ($count==$orderProduct->product_count)
        {
            DB::beginTransaction();
            try {

                $orderProduct->send_status=-1;
                $orderProduct->tozihat=$request->get('tozihat');
                $orderProduct->stockroom_id=$request->get('stockroom_id',0);
                $orderProduct->update();

                DB::commit();
                return[
                    'status'=>'ok',

                ];
            }
            catch (\Exception $exception)
            {
                DB::rollBack();
                return[
                    'status'=>'error',
                ];
            }
        }
    }
}
