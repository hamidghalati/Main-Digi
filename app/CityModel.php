<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CityModel extends Model
{
    use SoftDeletes;
    protected $table='city';
    protected $fillable=['name','province_id','send_time','send_price','min_order_price'];

    public static function getData($request)
    {
        $string='?';
        $city=self::orderBy('id','DESc')->with('getProvince');
        if (inTrashed($request)){
            $city=$city->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('string',$request)&& !empty($request['string']))
        {
            $city=$city->where('name','like','%'.$request['string'].'%');
            $string=create_paginate_url($string,'string='.$request['string']);
        }

        $city= $city->paginate(10);
        $city->withPath($string);
        return $city;

    }

    public function getProvince()
    {
        return $this->hasOne(ProvinceModel::class,'id','province_id')->withDefault(['name'=>'']);
    }
}
