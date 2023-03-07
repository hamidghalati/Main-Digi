<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes;
    protected $fillable=['time','product_id','user_id','questions_id','status','answer_count','send_email','questions','like','dislike'];
    public $timestamps=false;

    public function getUser(){
        return $this->hasOne(User::class,'id','user_id')->select(['id','name'])->withDefault(['name'=>'']);
    }

    public function getAnswer(){
        return $this->hasMany(Question::class,'questions_id','id')->where('status',1);
    }

    public function getUserInfo(){
        return $this->hasOne(AdditionalInfos::class,'user_id','user_id')
            ->select(['id','user_id','email','first_name','last_name']);
    }

    public function getProduct(){
        return $this->hasOne(ProductsModel::class,'id','product_id')->select(['id','product_url','title']);
    }

    public static function getData($request)
    {
        $string='?';
        $questions=self::with(['getProduct','getUserInfo','getParent'])->orderBy('id','DESc');
        if (inTrashed($request)){
            $questions=$questions->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('user_id',$request)&& !empty($request['user_id']))
        {
            $questions=$questions->where('user_id',$request['user_id']);
            $string=create_paginate_url($string,'string='.$request['string']);
        }

        $questions= $questions->paginate(10);
        $questions->withPath($string);
        return $questions;
    }

    public function getParent(){
        return $this->hasOne(Question::class,'id','questions_id');
    }

    public function getQuestionAttribute($value){
        return strip_tags(nl2br($value),'<br>');
    }
}
