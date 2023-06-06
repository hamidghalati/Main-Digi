<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use SoftDeletes;
    protected $table='pages';
    protected $fillable=['id','title','url','keywords','content','description'];

    public static function getData($request){
        $string='?';
        $pages=self::orderBy('id','Desc');
        if (inTrashed($request)){
            $pages=$pages->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('string', $request) && !empty($request['string'])) {
            $pages = $pages->where('title', 'like', '%' . $request['string'] . '%');
            $string = create_paginate_url($string, 'string=' . $request['string']);
        }


        $pages=$pages->paginate(10);
        $pages->withPath($string);
        return $pages;


    }
}
