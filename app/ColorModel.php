<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ColorModel extends Model
{
    use SoftDeletes;
    protected $table='colors';
    protected $fillable=['name','code'];

    public static function getData($request)
    {
        $string='?';
        $color=self::orderBy('id','DESc');
        if (inTrashed($request)){
            $color=$color->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('string',$request)&& !empty($request['string']))
        {
            $color=$color->where('name','like','%'.$request['string'].'%');
            $string=create_paginate_url($string,'string='.$request['string']);
        }

        $color= $color->paginate(10);
        $color->withPath($string);
        return $color;

    }

}
