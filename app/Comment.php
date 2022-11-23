<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;
    protected $table='comments';
    protected $fillable=['user_id','product_id','title','content','time','order_id','like','dislike','advantage','disadvantage','status'];

    public static function addComment($request,$product)
    {
        DB::beginTransaction();
        $user_id=$request->user()->id;
        $advantage=getCommentItem($request->get('advantage',array()));
        $disadvantage=getCommentItem($request->get('disadvantage',array()));
        $order_id=getCommentOrderId($product->id,$user_id);
        $time=time();
        $comment=new Comment($request->all());
        $comment->user_id=$user_id;
        $comment->product_id=$product->id;
        $comment->time=$time;
        $comment->advantage=$advantage;
        $comment->disadvantage=$disadvantage;
        $comment->status=0;
        $comment->order_id=$order_id;
        try {
       $comment->saveOrFail();

        $score=0;
        $array_score=$request->get('score_item',array());
        if (sizeof($array_score)==6)
        {
            $score=$array_score[0]+$array_score[1]+$array_score[2]+$array_score[3]+$array_score[4]+$array_score[5];
        }
        $product->score=$product->score+$score;
        $product->score_count=$product->score_count+1;
        $product->update();

        addScore($array_score,$comment->id,$product->id);

            DB::commit();
            return[
                'status'=>'ok',
            ];

        }
        catch (\Exception $exception)
        {
            DB::rollBack();
            return[
                'status'=>'error',
            ];
        }

    }

    public static function getData($request)
    {
        $string='?';
        $comments=self::with(['getProduct','getUserInfo','getScore'])->whereHas('getScore')->orderBy('id','DESc');
        if (inTrashed($request)){
            $comments=$comments->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('user_id',$request)&& !empty($request['user_id']))
        {
            $comments=$comments->where('user_id',$request['user_id']);
            $string=create_paginate_url($string,'string='.$request['string']);
        }

        $comments= $comments->paginate(10);
        $comments->withPath($string);
        return $comments;
    }

    public function getProduct()
    {
        return $this->hasOne(ProductsModel::class,'id','product_id')
            ->select(['id','title'])->withDefault(['title'=>'محصولات حذف شده']);
    }

    public function getUserInfo()
    {
        return $this->hasOne(AdditionalInfos::class,'user_id','user_id')
            ->select(['first_name','last_name']);
    }

    public function getScore()
    {
        return $this->hasOne(CommentScore::class,'comment_id','id');
    }

    public function getAdvantageAttribute($value)
    {
        $e=explode('|[@#]|',$value);
        return $e;

    }

    public function getDisadvantageAttribute($value)
    {
        $e=explode('|[@#]|',$value);
        return $e;

    }

}
