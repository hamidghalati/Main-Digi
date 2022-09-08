<?php

namespace App;

use App\Lib\Jdf;
use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Session;

class Order extends Model
{
    use SoftDeletes;
    protected $fillable=['date','user_id','send_type','address_id',
        'pay_status','total_price','price','order_id','pay_code1','pay_code2','order_read','send_type',
        'discount_value','discount_code','gift_value','gift_id'
        ];
    protected $table='orders';
    public function add_order($order_data)
    {
        $user_id=Auth::user()->id;
        $order_send_type=Session::get('order_send_type');
        $order_address_id=Session::get('order_address_id');
        $time=time();
        $order_code=substr($time,1,5).$user_id.substr($time,5,10);
        $jdf=new Jdf();
        $this->user_id=$user_id;
        $this->address_id=$order_address_id;
        $this->order_read='no';
        $this->pay_status='awaiting_payment';
        $this->order_id=$order_code;
        $this->date=$jdf->tr_num($jdf->jdate('Y-n-j'));
        $this->send_type=$order_send_type;
        $price=Session::get('final_price');
        if ($this->send_type==1)
        {
            $this->price=$order_data['integer_normal_cart_price'];
            $this->total_price=$order_data['integer_normal_cart_price'];
        }
        else{
            $this->price=$order_data['integer_fasted_cart_amount'];
            $this->total_price=$order_data['integer_fasted_cart_amount'];
        }
        if ($this->save())
        {

        }
    }
}
