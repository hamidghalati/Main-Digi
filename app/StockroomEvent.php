<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockroomEvent extends Model
{
    protected $fillable=['type','user_id','stockroom_id','tozihat','time','	product_count'];
}
