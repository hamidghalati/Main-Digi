<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stockrooms extends Model
{
    use SoftDeletes;
    protected $fillable=['name','address'];
    protected $table='stockrooms';

    public static function getData($request)
    {
        $string='?';
        $stockroom=self::orderBy('id','DESc');
        if (inTrashed($request)){
            $stockroom=$stockroom->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('string',$request)&& !empty($request['string']))
        {
            $stockroom=$stockroom->where('name','like','%'.$request['string'].'%');
            $string=create_paginate_url($string,'string='.$request['string']);
        }

        $stockroom= $stockroom->paginate(10);
        $stockroom->withPath($string);
        return $stockroom;

    }
}
