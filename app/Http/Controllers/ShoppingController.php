<?php

namespace App\Http\Controllers;

use App\Address;
use App\Cart;
use App\OrderingTime;
use App\ProvinceModel;
use Illuminate\Http\Request;

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

}
