<?php

namespace App\Http\Controllers\User;

use App\AdditionalInfos;
use App\GiftCart;
use App\Http\Controllers\Controller;
use App\Http\Requests\AdditionalRequest;
use App\Lib\MobileDetect;
use App\Order;
use App\OrderData;
use App\ProvinceModel;
use Auth;
use Illuminate\Http\Request;

class UserPanelController extends Controller
{
    protected $view='';
    public function __construct()
    {
        getCatList();
        $detect=new MobileDetect();
        if ($detect->isMobile() || $detect->isTablet())
        {
            $this->view='mobile.';
        }
    }

    public function gift_cart(Request $request)
    {
        $user_id=$request->user()->id;
        $gift_cart=GiftCart::where('user_id',$user_id)->orderBy('id','DESC')->paginate(10);
        return view($this->view.'userPanel.gift_cart',['gift_cart'=>$gift_cart]);
    }

    public function orders(Request $request)
    {
        $user_id=$request->user()->id;
        $orders=Order::where('user_id',$user_id)->orderBy('id','DESC')->paginate(10);
        return view($this->view.'UserPanel.orders',['orders'=>$orders]);
    }

    public function show_orders(Request $request,$order_id)
    {
        $user_id=$request->user()->id;
        $order=Order::with(['getProductRow','getOrderInfo','getAddress','getGiftCart'])
            ->where(['id'=>$order_id,'user_id'=>$user_id])->firstOrFail();
        $order_data=new OrderData($order->getOrderInfo,$order->getProductRow,$order->user_id);
        $order_data=$order_data->getData();
        return view($this->view.'UserPanel.show_order',['order'=>$order,'order_data'=>$order_data]);
    }

    public function profile()
    {
        $user_id=Auth::user()->id;
        $orders=null;
        $additionalInfo=null;
        if ($this->view!='mobile.')
        {
            $additionalInfo=AdditionalInfos::where(['user_id'=>$user_id])->first();
            $orders=Order::where(['user_id'=>$user_id])->orderBy('id','DESC')->limit(10)->get();
        }
        return view($this->view.'userPanel.profile',['orders'=>$orders,'additionalInfo'=>$additionalInfo]);
    }

    public function additional_info()
    {
        $user_id=Auth::user()->id;
        $province=ProvinceModel::pluck('name','id')->toArray();
        $province=[''=>'انتخاب استان']+$province;
        $additionalInfo=AdditionalInfos::where(['user_id'=>$user_id])->first();
        return view($this->view.'userPanel.additionalInfo',['additionalInfo'=>$additionalInfo,'province'=>$province]);
    }

    public function save_additional_info(AdditionalRequest $request)
    {

    }

}
