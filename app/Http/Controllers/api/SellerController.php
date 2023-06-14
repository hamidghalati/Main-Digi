<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Notifications\SendSms;
use App\Seller;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    public function first_step_register(Request $request)
    {
        return Seller::first_step_register($request);
    }

    public function second_step_register(Request $request)
    {
        return Seller::second_step_register($request);
    }

    public function resend_active_code(Request $request)
    {
        $mobile=$request->get('mobile');
        $seller=Seller::where(['mobile'=>$mobile,'step'=>2])->first();
        if ($seller)
        {
            $active_Code=rand(99999,1000000);
            $seller->active_code=$active_Code;
            $seller->update($request->all());
            $code= $seller->active_code;
            $message=config('shop-info.shop_name')."\n";
            $message.='کد تایید';
            $message.=':'.$code;

            $seller->notify(new SendSms($seller->mobile,$message));

            return ['status'=>'ok'];
        }
        else{
            return ['status'=>'error','message'=>'خطا در ثبت اطلاعات، مجدداً تلاش نمایید'];
        }
    }

    public function check_active_code(Request $request)
    {
        return Seller::check_active_cod($request);
    }

    public function upload_file(Request $request)
    {
        return Seller::upload_file($request);
    }
}
