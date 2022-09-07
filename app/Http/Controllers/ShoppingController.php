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



//            $orderingTime=new OrderingTime(5);
//            dd( $orderingTime->getGlobalSendData());


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

}
