<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockroomEvent extends Model
{
    protected $fillable=['type','user_id','stockroom_id','tozihat','time','	product_count'];

    public function getUser()
    {
        return $this->hasOne(User::class,'id','user_id')->withDefault(['name'=>'ناشناس']);
    }

    public function getStockroom()
    {
        return $this->hasOne(Stockrooms::class,'id','stockroom_id')->withDefault(['name'=>'حذف شده']);
    }

    public static function getList($request,$type)
    {
        $stockroom_id=$request->get('stockroom_id',0);
        settype($stockroom_id,'integer');

        $stockroomEvent=self::with(['getUser','getStockroom'])->where('type',$type);
        if ($stockroom_id>0)
        {
            $stockroomEvent= $stockroomEvent->where(['stockroom_id'=>$stockroom_id]);
        }
        $stockroomEvent=$stockroomEvent->orderBy('id','DESC')->paginate(10);
        return $stockroomEvent;
    }
}
