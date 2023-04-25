<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Commission extends Model
{
    use SoftDeletes;
    protected $fillable=['cat_id','brand_id','percentage'];

    public static function getData($request){
        $string='?';
        $commission=self::orderBy('id','DESc')->with(['getBrand','getCategory']);
        if (inTrashed($request)){
            $commission=$commission->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('brand_id',$request)&& !empty($request['brand_id']))
        {
            $commission=$commission->where('brand_id',$request['brand_id']);
            $string=create_paginate_url($string,'brand_id='.$request['brand_id']);
        }
        if (array_key_exists('cat_id',$request)&& !empty($request['cat_id']))
        {
            $commission=$commission->where('cat_id',$request['cat_id']);
            $string=create_paginate_url($string,'cat_id='.$request['cat_id']);
        }

        $commission= $commission->paginate(10);
        $commission->withPath($string);
        return $commission;
    }

    public function getBrand()
    {
        return $this->hasOne(BrandsModel::class,'id','brand_id')->withDefault(['brand_id'=>'حذف شده']);
    }
    public function getCategory()
    {
        return $this->hasOne(CategoriesModel::class,'id','cat_id')->withDefault(['name'=>'حذف شده']);
    }

}
