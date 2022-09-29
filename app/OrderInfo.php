<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderInfo extends Model
{
    protected $table='order_infos';
    protected $fillable=['order_id','delivery_order_interval','send_order_amount','product_id','warranty_id','colors_id','send_status','order_send_time'];

    public static function getData($request,$send_status=0,$order='ASC')
    {
        $string='?';
        $submission=self::orderBy('order_send_time',$order);
        if (inTrashed($request)){
            $submission=$submission->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('submission_id',$request)&& !empty($request['submission_id']))
        {
            $submission_id=replace_number2($request['submission_id']);
            $submission=$submission->where('id',$submission_id);
            $string=create_paginate_url($string,'submission_id='.$request['submission_id']);
        }

        if ($send_status>=1)
        {
            $submission=$submission->where('send_status',$send_status);
        }

        $submission= $submission->orderBy('id','DESc')->paginate(10);
        $submission->withPath($string);
        return $submission;

    }

    public function getOrder(){
        return $this->hasOne(Order::class,'id','order_id');
    }




}
