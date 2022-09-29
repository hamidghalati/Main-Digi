<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GiftCart extends Model
{
    protected $table='gift_carts';
    protected $fillable=['code','user_id','order_id','credit_cart','credit_used','validity_date'];

}
