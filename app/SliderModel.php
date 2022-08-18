<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SliderModel extends Model
{
    use SoftDeletes;
    protected $table='sliders';
    protected $fillable = ['title','link','image_url','mobile_image_ur'];

    public static function getData($request)
    {
        $string='?';
        $sliders=self::orderBy('id','DESc');
        if (inTrashed($request)){
            $sliders=$sliders->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('string',$request)&& !empty($request['string']))
        {
            $sliders=$sliders->where('title','like','%'.$request['string'].'%');
            $string=create_paginate_url($string,'string='.$request['string']);
        }

        $sliders= $sliders->paginate(10);
        $sliders->withPath($string);
        return $sliders;

    }





}
