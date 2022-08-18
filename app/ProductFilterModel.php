<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductFilterModel extends Model
{
    protected $table='filter_product';
    protected $fillable=['product_id','filter_id','filter_value'];
}
