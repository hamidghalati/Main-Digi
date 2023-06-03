<?php

namespace App\Http\Controllers;

use App\Address;
use App\Cart;
use App\DiscountCode;
use App\GiftCart;
use App\Jobs\OrderStatistics;
use App\Lib\MobileDetect;
use App\Order;

use App\OrderData;
use App\OrderingTime;
use App\ProvinceModel;
use DB;
use Illuminate\Http\Request;
use Mail;
use Session;

class ShoppingController extends Controller
{
    protected $view='';

    public function __construct()
    {
        $this->middleware('auth');

        $detect=new MobileDetect();
        if ($detect->isMobile() || $detect->isTablet())
        {
            $this->view='mobile.';
        }

    }

    public function shipping(Request $request)
    {
        if (Cart::get_product_count()>0)
        {
            $user_id=$request->user()->id;
            $address=Address::with(['getProvince','getCity'])->where('user_id',$user_id)->orderBy('id','DESC')->get();
          return view($this->view.'shipping.set_data',['address'=>$address]);
        }
        else
        {
            return redirect('/');
        }
    }

    public function getSendData($city_id)
    {
        $orderingTime= new OrderingTime($city_id);
        return  $orderingTime->getGlobalSendData();
    }

    public function payment(Request $request)
    {
        if (Cart::get_product_count()>0)
        {
            $address_id=$request->get('address_id');
            $user_id=$request->user()->id;
            $address=Address::where(['id'=>$address_id,'user_id'=>$user_id])->first();
            $send_type=$request->get('send_type',1);
            if ($address)
            {
                Session::put('order_address_id',$address_id);
                Session::put('order_send_type',$send_type);
                $OreringTime=new OrderingTime($address->city_id);
                $send_order_data=$OreringTime->getGlobalSendData();

                $cart_final_price=$send_type==1 ? $send_order_data['integer_normal_cart_price'] : $send_order_data['integer_fasted_cart_amount'];
                Session::put('cart_final_price',$cart_final_price);


                return view($this->view.'shipping.payment',['send_order_data'=>$send_order_data,'send_type'=>$send_type]);
            }
            else
            {
                return redirect('/shipping');
            }
        }
        else
        {
            return redirect('/');
        }
    }

    public function order_payment(Request $request)
    {
        $address_id=Session::get('order_address_id');
        $user_id=$request->user()->id;
        if ($address_id)
        {
            $address=Address::where(['id'=>$address_id,'user_id'=>$user_id])->first();
            if ($address)
            {
                $OreringTime=new OrderingTime($address->city_id);
                $send_order_data=$OreringTime->getGlobalSendData();
                $order=new Order();
               $order->add_order($send_order_data);
            }
            else{
                return redirect('/shipping');
            }


        }
        else{
            return redirect('/shipping');
        }
    }

    public function verify(){
        $order_id=142;
        DB::beginTransaction();
        try {
            $order=Order::with(['getProductRow.getProduct','getOrderInfo','getAddress','getGiftCart','getUserInfo'])
                ->where(['id'=>$order_id])->firstOrFail();
            $order->pay_status='ok';
            $order->update();

            $order_data=new OrderData($order->getOrderInfo,$order->getProductRow,$order->user_id,'yes');
            $order_data=$order_data->getData();


            if (Session::has('gift_value')&& Session::get('gift_value')>0)
            {
                $gift_value=Session::get('gift_value');
                $gift_id=Session::get('gift_cart');
                $giftCart=GiftCart::where('id',$gift_id)->first();
                if ($giftCart)
                {
                    $giftCart->credit_used+=$gift_value;
                    $giftCart->update();
                }
                Session::forget('gift_value');
                Session::forget('gift_cart');
            }

            DB::table('order_infos')->where('order_id',$order_id)->update(['send_status'=>1]);
            DB::table('order_products')->where('order_id',$order_id)->update(['send_status'=>1]);

            DB::commit();

            OrderStatistics::dispatch($order);

            if (!empty($order->getUserInfo->email))
            {
                Mail::to($order->getUserInfo->email)->queue(new \App\Mail\Order($order,$order_data));
            }


            return view('shipping.verify',['order'=>$order,'order_data'=>$order_data]);



        }
        catch (\Exception $exception)
        {
            DB::rollBack();
            return[
                'error_payment'=>'خطا در ثبت اطلاعات.برای بررسی خطای پیش آمده با پشتیبانی در ارتباط باشید',
            ];

        }



    }

    public function check_gift_cart(Request $request)
    {
        $code=$request->get('code');
        $gift_cart=GiftCart::where('code',$code)->first();
        if ($gift_cart)
        {
            $cart_final_price=Session::get('cart_final_price',0);

            if (Session::get('gift_value',0)>0)
            {
                $cart_final_price+=Session::get('gift_value',0);
            }

            if ($gift_cart->credit_cart-$gift_cart->credit_used>0)
            {
                $use=$gift_cart->credit_cart-$gift_cart->credit_used;
                if ($cart_final_price<$use)
                {
                    $use=$cart_final_price;
                }
                Session::put('gift_value',$use);
                Session::put('gift_cart',$gift_cart->id);
                $cart_final_price=$cart_final_price-$use;
                return [
                  'status'=>'yes',
                  'gift_value'=>replace_number(number_format($use)).' تومان ',
                  'cart_final_price'=>replace_number(number_format($cart_final_price)).' تومان '
                ];
            }
            else{
                return 'اعتبار کارت هدیه برای استفاده به اتمام رسیده ';
            }

        }
        else{
            return 'کارت هدیه وارد شده اشتباه می باشد';
        }
    }

    public function check_discount_code(Request $request)
    {
        $code=$request->get('code');
        $time=time();
        $discounts=DiscountCode::where('code',$code)->where('expire_time','>=',$time)->get();
        if ($discounts)
        {
            return DiscountCode::check($discounts);
        }
        else
        {
            return 'کد تخفیف وارد شده اشتباه می باشد';
        }

    }

}
