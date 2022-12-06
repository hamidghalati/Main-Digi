<?php

namespace App;

use Auth;
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

    public static function getProductCommentList($product_id,$orderBy)
    {
        $array=array();
        $n=CommentScore::where(['product_id'=>$product_id,'status'=>1])->count();
        $sum1=CommentScore::where(['product_id'=>$product_id,'status'=>1])->sum('score1');
        $sum2=CommentScore::where(['product_id'=>$product_id,'status'=>1])->sum('score2');
        $sum3=CommentScore::where(['product_id'=>$product_id,'status'=>1])->sum('score3');
        $sum4=CommentScore::where(['product_id'=>$product_id,'status'=>1])->sum('score4');
        $sum5=CommentScore::where(['product_id'=>$product_id,'status'=>1])->sum('score5');
        $sum6=CommentScore::where(['product_id'=>$product_id,'status'=>1])->sum('score6');
        if ($n>0)
        {
            $sum1/=$n;
            $sum2/=$n;
            $sum3/=$n;
            $sum4/=$n;
            $sum5/=$n;
            $sum6/=$n;
        }

        $comments=Comment::with(['getUserInfo','getScore'])
            ->whereHas('getScore')
            ->where(['product_id'=>$product_id,'status'=>1]);

        if ($orderBy==1)
        {
            $comments= $comments->orderBy('order_id','DESC');
        }
        else if ($orderBy==2)
        {
            $comments= $comments->orderBy('like','DESC');
        }
        else if ($orderBy==3)
        {
            $comments= $comments->orderBy('id','DESC');
        }

        $comments=$comments->paginate(10);
        $array['comment']=$comments;

        $avg=$sum1+$sum2+$sum3+$sum4+$sum5+$sum6;
        $avg/=6;
        $array['avg']=round($avg);
        $array['comment_count']=$n;

        $array['avg_score']=[$sum1,$sum2,$sum3,$sum4,$sum5,$sum6];

        return $array;
    }

    public static function addUserScore($comment_id,$score_type)
    {
        $comment=Comment::find($comment_id);
        if ($comment)
        {
            $user_id=Auth::user()->id;
            $user_scored_status=DB::table('user_scored_status')
                ->where(['user_id'=>$user_id,'row_id'=>$comment_id,'score_type'=>$score_type,'type'=>'comment'])
                ->first();
            if ($user_scored_status)
            {
                DB::table('user_scored_status')
                    ->where(['user_id'=>$user_id,'row_id'=>$comment_id,'score_type'=>$score_type,'type'=>'comment'])
                    ->delete();
                $comment->$score_type=$comment->$score_type-1;
                $comment->update();
                return 'remove';
            }
            else{
                DB::table('user_scored_status')
                    ->insert([
                        'user_id'=>$user_id,
                        'row_id'=>$comment_id,
                        'score_type'=>$score_type,
                        'type'=>'comment'
                    ]);
                $comment->$score_type=$comment->$score_type+1;
                $comment->update();
                return 'add';
            }
        }
        else{
            return 'error';
        }
    }

}
