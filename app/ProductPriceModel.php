<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductPriceModel extends Model
{
    protected $table='product_price';
    protected $fillable=['warranty_id','time','Year','month','day','price','product_id','color_id'];








}
