<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use function PHPUnit\Framework\isEmpty;

class BrandsModel extends Model
{
    use SoftDeletes;
    protected $table='brands';
    protected $fillable=['brand_name','brand_ename','brand_icon','description'];

    public static function getData($request)
    {
        $string='?';
        $brand=self::orderBy('id','DESc');
        if (inTrashed($request)){
            $brand=$brand->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('string',$request)&& !empty($request['string']))
        {
            $brand=$brand->where('brand_name','like','%'.$request['string'].'%');
            $string=create_paginate_url($string,'string='.$request['string']);
        }

        $brand= $brand->paginate(10);
        $brand->withPath($string);
        return $brand;

    }

    protected static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub
        static::deleting(function ($brand){
            if ($brand->isForceDeleting())
            {
                if (!empty($brand->brand_icon)&& file_exists('files/upload/'.$brand->brand_icon)){
                    unlink('files/upload/'.$brand->brand_icon);
                }
            }
        });
    }
}
