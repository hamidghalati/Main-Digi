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
        return $this->hasOne(ProductsModel::class,'id','product_id')->select('id','product_url');
    }
}
