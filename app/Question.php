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
}
