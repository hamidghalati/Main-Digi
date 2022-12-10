<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductPriceModel extends Model
{
    protected $table='product_price';
    protected $fillable=['warranty_id','time','Year','month','day','price','product_id','color_id'];


    public function getColor()
    {
        return $this->hasOne(ColorModel::class,'id','color_id');
    }

    public function getProductWarranty()
    {
        return $this->hasOne(ProductWarranty::class,'id','warranty_id');
    }





}
