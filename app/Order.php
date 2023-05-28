<?php

namespace App;

use App\Lib\jdf;
use Auth;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Session;

class Order extends Model
{

    use SoftDeletes;
    protected $fillable=['id','date','user_id','send_type','address_id',
        'pay_status','total_price','price','order_id','pay_code1','pay_code2','order_read','send_type',
        'discount_value','discount_code','gift_value','gift_id','created_at'
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
        $jdf=new jdf();
        $this->user_id=$user_id;
        $this->address_id=$order_address_id;
        $this->order_read='no';
        $this->pay_status='awaiting_payment';
        $this->order_id=$order_code;
        $this->date=$jdf->tr_num($jdf->jdate('Y-n-j'));
        $this->send_type=$order_send_type;
        $price=Session::get('final_price');
        $final_price=Session::get('final_price',0);
        if ($this->send_type==1)
        {
            $final_price+=$order_data['integer_normal_send_order_amount'];
            $this->price=$order_data['integer_normal_cart_price'];
            $this->total_price=$final_price;
        }
        else{
            $final_price+=$order_data['integer_total_fast_send_amount'];
            $this->price=$order_data['integer_fasted_cart_amount'];
            $this->total_price=$final_price;
        }

        if (Session::has('gift_value')&& Session::get('gift_value')>0)
        {
            $this->gift_value=Session::get('gift_value');
            $this->gift_id=Session::get('gift_cart');
        }

        if (Session::has('discount_value')&& Session::get('discount_value')>0)
        {
            $this->discount_value=Session::get('discount_value');
            $this->discount_code=Session::get('discount_code');
        }

        DB::beginTransaction();
        try {
            $this->save();
            $this->add_order_row($order_data);
            $this->add_order_discount();
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
                $p1=($value['price1']/$value['product_count']);
                $p2=($value['price2']/$value['product_count']);
                DB::table('order_products')->insert([
                    'order_id'=>$this->id,
                    'product_id'=>$value['product_id'],
                    'color_id'=>$value['color_id'],
                    'warranty_id'=>$value['warranty_id'],
                    'product_price1'=>$p1,
                    'product_price2'=>$p2,
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
        $jdf=new jdf();
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
        $products_id=$collection->implode('-');
        return $products_id;
    }

    public function get_fasted_send_warranty_id($order_data,$key)
    {
        $collection=collect($order_data['array_warranty_id'][$key]);
        $warranty_id=$collection->implode('-');
        return $warranty_id;
    }

    public function get_fasted_send_colors_id($order_data,$key)
    {
        $collection=collect($order_data['array_colors_id'][$key]);
        $colors_id=$collection->implode('-');
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
                $product_id.='-';
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
                $warranty_id.='-';
                $this->colors_id.='-';
            }
            $j++;

        }
        return $warranty_id;
    }

    public function getProductRow(){
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

    public static function getData($request){
        $string='?';
        $orders=self::orderBy('id','DESc');
        if (inTrashed($request)){
            $orders=$orders->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('user_id',$request)&& !empty($request['user_id']))
        {
            $orders=$orders->where('user_id','like','%'.$request['user_id'].'%');
            $string=create_paginate_url($string,'user_id='.$request['user_id']);
        }

        if (array_key_exists('order_id',$request)&& !empty($request['order_id']))
        {
            $order_id=replace_number2($request['order_id']);
            $orders=$orders->where('order_id','like','%'.$order_id.'%');
            $string=create_paginate_url($string,'order_id='.$request['order_id']);
        }

        if (array_key_exists('first_date',$request)&& !empty($request['first_date']))
        {
            $first_date=getTimestamp($request['first_date'],'first');
            $orders=$orders->where('created_at','>=',$first_date);
            $string=create_paginate_url($string,'first_date='.$request['first_date']);
        }

        if (array_key_exists('end_date',$request)&& !empty($request['end_date']))
        {
            $end_date=getTimestamp($request['end_date'],'end');
            $orders=$orders->where('created_at','<',$end_date);
            $string=create_paginate_url($string,'end_date='.$request['end_date']);
        }

        $orders= $orders->paginate(10);
        $orders->withPath($string);
        return $orders;
    }

    public function getGiftCart()
    {
        return $this->hasOne(GiftCart::class,'id','gift_id')
            ->withDefault(['code'=>'']);
    }

    public function getOrderProduct()
    {
        return $this->hasMany(OrderProduct::class,'order_id','id');
    }

    public static function getChartData()
    {
        $jdf=new jdf();
        $date=$jdf->tr_num($jdf->jdate('Y/n')).'/1';
        $time=getTimestamp($date,'first');


        $month=$jdf->tr_num($jdf->jdate('F Y'));

        $y=$jdf->tr_num($jdf->jdate('Y'));
        $m=$jdf->tr_num($jdf->jdate('n'));
        $t=$jdf->tr_num($jdf->jdate('t'));

        $date_list=array();
        $price_array=array();
        $count_array=array();
        for ($i=1;$i<=$t;$i++)
        {
            $d=$y.'-'.$m.'-'.$i;
            $date_list[$i]=$d;
        }

       $orders=self::where(['pay_status'=>'ok'])
           ->where('created_at','>=',$time)
           ->get();

        foreach ($orders as $order)
        {
            if (array_key_exists($order->date,$price_array))
            {
                $price_array[$order->date]=$price_array[$order->date]+$order->price;
                $count_array[$order->date]+=1;
            }
            else{
                $price_array[$order->date]=$order->price;
                $count_array[$order->date]=1;

            }
        }



        return[
            'price_array'=>$price_array,
            'count_array'=>$count_array,
            'date_list'=>$date_list,
            'month'=>$month
        ];

    }

    public function add_order_discount()
    {
        $discount_info=Session::get('discount_info',array());
        $discount_value_array=Session::get('discount_value_array',array());
        foreach ($discount_value_array as $key=>$value)
        {
            if (array_key_exists($key,$discount_info))
            {
                $amount_percent=$discount_info[$key]['amount_percent'];
                settype($value,'integer');
                settype($amount_percent,'integer');
                DB::table('order_discount')->insert([
                    'cat_id'=>$key,
                    'discount_price'=>$value,
                    'total_price'=>$discount_info[$key]['price'],
                    'min_price'=>$discount_info[$key]['discount_amount'],
                    'order_id'=>$this->id,
                    'amount_percent'=>$amount_percent
                ]);
            }

        }
    }





}
