<?php

namespace App\Http\Controllers;

use App\Address;
use App\Cart;
use App\Order;

use App\OrderData;
use App\OrderingTime;
use App\ProvinceModel;
use DB;
use Illuminate\Http\Request;
use Session;

class ShoppingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function shipping(Request $request)
    {
        if (Cart::get_product_count()>0)
        {
            $user_id=$request->user()->id;
            $address=Address::with(['getProvince','getCity'])->where('user_id',$user_id)->orderBy('id','DESC')->get();
          return view('shipping.set_data',['address'=>$address]);
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
                return view('shipping.payment',['send_order_data'=>$send_order_data,'send_type'=>$send_type]);
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
        $order_id=15;
        $order=Order::with(['getProductRow','getOrderInfo','getAddress'])
            ->where(['id'=>$order_id])->firstOrFail();
        $order->pay_status='ok';
        $order->update();

        $order_data=new OrderData($order->getOrderInfo,$order->getProductRow);
        $order_data=$order_data->getData();

        DB::table('order_infos')->where('order_id',$order_id)->update(['send_status'=>1]);
        DB::table('order_products')->where('order_id',$order_id)->update(['send_status'=>1]);

        return view('shipping.verify',['order'=>$order,'order_data'=>$order_data]);
    }

}
