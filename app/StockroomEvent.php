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
}
