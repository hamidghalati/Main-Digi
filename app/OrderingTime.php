<?php
namespace App;
use App\Lib\jdf;
use Session;

class OrderingTime
{
    protected $city_id;
    protected $send_time=0;
    protected $send_price=0;
    protected $min_order_price=0;
    protected $cart_product_data=array();
    protected $cart_price=0;
    protected $send_status=array();
    protected $array_product_id=array();
    protected $array_warranty_id=array();
    protected $order_price_by_fast_send=array();
    protected $minDay=array();
    protected $maxDay=array();
    protected $minTimeStamp=array();
    protected $maxTimeStamp=array();
    protected $day_label1=array();
    protected $day_label2=array();
    protected $total_fast_send_amount=0;
    protected $cart_amount=0;
    protected $fasted_cart_amount=0;
    protected $normal_send_day=0;
    protected $array_colors_id=array();



    public function __construct($city_id)
    {
        $this->city_id=$city_id;

    }

    public function getGlobalSendData()
    {
        $city=CityModel::find($this->city_id);
        if ($city && !empty($city->send_time) && !empty($city->send_price) && !empty($city->min_order_price))
        {
            $send_time=$city->send_time;
            $send_price=$city->send_price;
            $min_order_price=$city->min_order_price;
            settype($send_time,'integer');
            settype($send_price,'integer');
            settype($min_order_price,'integer');
            $this->send_time=$send_time;
            $this->send_price=$send_price;
            $this->min_order_price=$min_order_price;

        }
        else
        {
            $setting=new Setting();
            $values=$setting->get_data(['send_time','send_price','min_order_price']);
            $send_time=$values['send_time'];
            $send_price=$values['send_price'];
            $min_order_price=$values['min_order_price'];
            settype($send_time,'integer');
            settype($send_price,'integer');
            settype($min_order_price,'integer');
            $this->send_time=$send_time;
            $this->send_price=$send_price;
            $this->min_order_price=$min_order_price;
        }
      return  $this->getCartData();
    }

    public function getCartData()
    {
        $getCartData=Cart::getCartData('shopping');

        foreach ($getCartData['product']as $product)
        {
            $k=$product['product_id'].'_'.$product['product_warranty_id'];
            $this->cart_product_data[$k]=$product;
            $this->cart_price+=$product['price2'];
            $this->set_fast_order_sending_time($product);


        }
        $array=array();
        $array['delivery_order_interval']=$this->get_delivery_order_interval();
        if ($this->cart_price < $this->min_order_price)
        {
            $array['normal_send_order_amount']=replace_number(number_format($this->send_price)).' تومان ';
            $array['integer_normal_send_order_amount']=$this->send_price;

            $normal_cart_price=$this->cart_price+$this->send_price;

            if (Session::has('gift_value')&& Session::get('gift_value')>0)
            {
                $normal_cart_price=$normal_cart_price-Session::get('gift_value');
            }

            if (Session::has('discount_value')&& Session::get('discount_value')>0)
            {
                $normal_cart_price=$normal_cart_price-Session::get('discount_value');
            }

            $array['normal_cart_price']=replace_number(number_format($normal_cart_price)).' تومان ';
            $array['integer_normal_cart_price']=$normal_cart_price;


        }
        else
        {
            $array['normal_send_order_amount']="رایگان";
            $array['integer_normal_send_order_amount']=0;

            if (Session::has('gift_value')&& Session::get('gift_value')>0)
            {
                $this->cart_price-=Session::get('gift_value');
            }

            if (Session::has('discount_value')&& Session::get('discount_value')>0)
            {
                $this->cart_price-=Session::get('discount_value');
            }


            $array['normal_cart_price']=replace_number(number_format($this->cart_price)).' تومان ';
            $array['integer_normal_cart_price']=$this->cart_price;
        }


        $fasted_cart_amount=$this->cart_price+$this->total_fast_send_amount;
        $array['fasted_cart_amount']=replace_number(number_format($fasted_cart_amount)).' تومان ';
        $array['integer_fasted_cart_amount']=$fasted_cart_amount;

        $array['total_fast_send_amount']=$this->total_fast_send_amount==0 ? 'رایگان': replace_number(number_format($this->total_fast_send_amount)).' تومان ';
        $array['integer_total_fast_send_amount']=$this->total_fast_send_amount==0 ? 0 : $this->total_fast_send_amount;

        $array['normal_send_day']=$this->normal_send_day;



        $array['min_ordering_day']=$this->get_min_ordering_day();
        $array['max_ordering_day']=$this->get_max_ordering_day();
        $array['cart_product_data']=$this->cart_product_data;
        $array['array_product_id']=$this->array_product_id;
        $array['array_warranty_id']=$this->array_warranty_id;
        $array['array_colors_id']=$this->array_colors_id;

       return $array;


    }

    public function set_fast_order_sending_time($product)
    {
        $day=$product['send_day'];
        $collection=collect($this->send_status);
        $key=$collection->search($day);
        if ($key==false && is_bool($key))
        {
            $this->array_product_id[sizeof($this->send_status)][$product['product_warranty_id']]=$product['product_id'];
            $this->array_warranty_id[sizeof($this->send_status)][$product['product_warranty_id']]=$product['warranty_id'];
            $this->array_colors_id[sizeof($this->send_status)][$product['product_warranty_id']]=$product['color_id'];

            $this->order_price_by_fast_send[sizeof($this->send_status)]=$product['price2'];
            $this->send_status[sizeof($this->send_status)]=$day;
        }
        else{
            $this->array_product_id[$key][$product['product_warranty_id']]=$product['product_id'];
            $this->array_warranty_id[$key][$product['product_warranty_id']]=$product['warranty_id'];
            $this->array_colors_id[$key][$product['product_warranty_id']]=$product['color_id'];
            $this->order_price_by_fast_send[$key]=$this->order_price_by_fast_send[$key]+$product['price2'];
        }


    }

    public function get_delivery_order_interval()
    {
        $day_array=array();
        $jdf=new jdf();
        foreach ($this->send_status as $key=>$value)
        {
            settype($value,'integer');
            $day1=$value+$this->send_time;
            $day2=$day1+3;
            $this->minDay[$key]=$day1;
            $this->maxDay[$key]=$day2;

            $this->minTimeStamp[$key]=strtotime('+ '.$day1.'day');
            $this->maxTimeStamp[$key]=strtotime('+ '.$day2.'day');

            $this->day_label1[$key]=$jdf->jdate('j F Y',$this->minTimeStamp[$key]);
            $this->day_label2[$key]=$jdf->jdate('j F Y',$this->maxTimeStamp[$key]);

            $day_array[$key]=['day_label1'=>$this->day_label1[$key],'day_label2'=>$this->day_label2[$key]];

            if ($this->order_price_by_fast_send[$key] < $this->min_order_price)
            {
                $this->total_fast_send_amount=$this->total_fast_send_amount+$this->send_price;
                $day_array[$key]['send_fast_price']=replace_number(number_format($this->send_price)).' تومان ';
                $day_array[$key]['integer_send_fast_price']=$this->send_price;


            }
            else{
                $day_array[$key]['send_fast_price']="رایگان";
                $day_array[$key]['integer_send_fast_price']=0;
            }
            $day_array[$key]['send_order_day_number']=$value;

            if ($value>$this->normal_send_day)
            {
                $this->normal_send_day=$value;
            }
        }
        return $day_array;


    }

    public function get_min_ordering_day()
    {
        $collection=collect($this->minDay);
        $max_value=$collection->max();
        $key=$collection->search($max_value);
        return $this->day_label1[$key];
    }

    public function get_max_ordering_day()
    {
        $collection=collect($this->maxDay);
        $max_value=$collection->max();
        $key=$collection->search($max_value);
        return $this->day_label2[$key];
    }

}
