<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductColorModel extends Model
{
   protected $table='product_color';
   protected $fillable=['color_id','product_id'];

   public function getColor(){
       return $this->hasOne(ColorModel::class,'id','color_id');
   }
}
