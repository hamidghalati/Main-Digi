<?php

namespace App;

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
            ->select(['id','title','image_url']);
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
}
