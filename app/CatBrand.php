<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CatBrand extends Model
{
    protected $table='cat_brands';
    protected $fillable=['cat_id','brand_id','product_count'];
}
