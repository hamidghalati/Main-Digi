<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockroomProduct extends Model
{
    protected $fillable=['event_id','product_warranty_id','product_count','stockroom_id'];
}
