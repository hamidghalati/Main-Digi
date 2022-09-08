<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderInfo extends Model
{
    protected $table='order_infos';
    protected $fillable=['order_id','delivery_order_interval','send_order_amount','product_id','warranty_id','colors_id','send_status','order_send_time'];
}
