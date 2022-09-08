<?php

namespace App;

use App\Lib\Jdf;
use Auth;
use DB;
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
    protected $dateFormat='U';
    protected $colors_id='';


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
        DB::beginTransaction();
        try {
            $this->save();
            $this->add_order_row($order_data);
            DB::commit();
            return[
                'status'=>'ok',
                'order_id'=>$this->id,
                'price'=>$this->price
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

    public function add_order_row($order_data)
    {
        $time=time();
        if (array_key_exists('cart_product_data',$order_data))
        {
            foreach ($order_data['cart_product_data'] as $key=>$value)
            {
                DB::table('order_products')->insert([
                    'order_id'=>$this->id,
                    'product_id'=>$value['product_id'],
                    'color_id'=>$value['color_id'],
                    'warranty_id'=>$value['warranty_id'],
                    'product_price1'=>$value['price1'],
                    'product_price2'=>$value['price2'],
                    'product_count'=>$value['product_count'],
                    'seller_id'=>$value['seller_id'],
                    'preparation_time'=>$value['send_day'],
                    'time'=>$time,
                ]);
            }
            $this->add_order_info($order_data);

        }
    }

    public function add_order_info($order_data)
    {
        $this->colors_id='';
        $jdf=new Jdf();
        $h=$jdf->tr_num($jdf->jdate('H'));
        $h=(24-$h);

        if ($this->send_type==1)
        {
            $send_order_day_number=$order_data['normal_send_day'];
            settype($send_order_day_number,'integer');
            $time=$send_order_day_number*24*24*60*60;
            $order_send_time=time()+$time+($h*60*60);
            $order_info=new OrderInfo();
            $order_info->order_id=$this->id;
            $order_info->delivery_order_interval=$order_data['min_ordering_day'].' تا '.$order_data['max_ordering_day'];
            $order_info->send_order_amount=$order_data['integer_normal_send_order_amount'];
            $order_info->send_status=0;
            $order_info->order_send_time=$order_send_time;
            $order_info->product_id=$this->get_product_id($order_data);
            $order_info->warranty_id=$this->get_warranty_id($order_data);
            $order_info->colors_id=$this->colors_id;
            $order_info->save();

        }
        else{
            foreach ($order_data['delivery_order_interval'] as $key=>$value)
            {
                $send_order_day_number=$value['send_order_day_number'];
                settype($send_order_day_number,'integer');
                $time=$send_order_day_number*24*24*60*60;
                $order_send_time=time()+$time+($h*60*60);
                $order_info=new OrderInfo();
                $order_info->order_id=$this->id;
                $order_info->delivery_order_interval=$value['day_label1'].' تا '.$value['day_label2'];
                $order_info->send_order_amount=$value['integer_send_fast_price'];
                $order_info->product_id=$this->get_fasted_send_product_id($order_data,$key);
                $order_info->warranty_id=$this->get_fasted_send_warranty_id($order_data,$key);
                $order_info->colors_id=$this->get_fasted_send_colors_id($order_data,$key);
                $order_info->send_status=0;
                $order_info->order_send_time=$order_send_time;
                $order_info->save();

            }
        }
    }

    public function get_fasted_send_product_id($order_data,$key)
    {
        $collection=collect($order_data['array_product_id'][$key]);
        $products_id=$collection->implode('_');
        return $products_id;
    }

    public function get_fasted_send_warranty_id($order_data,$key)
    {
        $collection=collect($order_data['array_warranty_id'][$key]);
        $warranty_id=$collection->implode('_');
        return $warranty_id;
    }
    public function get_fasted_send_colors_id($order_data,$key)
    {
        $collection=collect($order_data['array_colors_id'][$key]);
        $colors_id=$collection->implode('_');
        return $colors_id;
    }

    public function get_product_id($order_data)
    {
        $product_id='';
        $j=0;
        foreach ($order_data['cart_product_data'] as $key=>$value)
        {
            $product_id=$product_id.$value['product_id'];
            if ($j!=sizeof($order_data['cart_product_data'])-1)
            {
                $product_id.='_';
            }
            $j++;

        }
        return $product_id;
    }

    public function get_warranty_id($order_data)
    {
        $warranty_id='';
        $j=0;
        foreach ($order_data['cart_product_data'] as $key=>$value)
        {
            $warranty_id=$warranty_id.$value['warranty_id'];
            $this->colors_id=$this->colors_id.$value['color_id'];
            if ($j!=sizeof($order_data['cart_product_data'])-1)
            {
                $warranty_id.='_';
                $this->colors_id.='_';
            }
            $j++;

        }
        return $warranty_id;
    }

    public function getOrdertRow(){
        return $this->hasMany(OrderProduct::class,'order_id','id')
            ->with(['getProduct','getColor','getWarranty']);
    }

    public function getOrderInfo(){
        return $this->hasMany(OrderInfo::class,'order_id','id');

    }

    public function getAddress()
    {
        return $this->hasOne(Address::class,'id','address_id')
         ->with(['getProvince','getCity']) ->withDefault('name','')->withTrashed();
    }

    public static function orderStatus()
    {
        $array=array();
        $array[-2]='خطا در اتصال به درگاه پرداخت';
        $array[-1]='لغو شده';
        $array[0]='در انتظار پرداخت';
        $array[1]='تایید سفارش';
        $array[2]='آماده سازی سفارش';
        $array[3]='خروج از مرکز پردازش';
        $array[4]='تحویل به پست';
        $array[5]='دریافت از مرکز مبادلات پست';
        $array[6]='تحویل مرسوله به مشتری';
        return $array;

    }

    public static function getOrderStatus($status,$orderStatus)
    {
        return $orderStatus[$status];
    }


}
