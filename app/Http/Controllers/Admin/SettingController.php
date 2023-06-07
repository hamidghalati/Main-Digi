<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingRequest;
use App\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function send_order_price(SettingRequest $request)
    {
        $setting=new Setting();
        if ($request->isMethod('post'))
        {
            $data=$setting->set_data($request->all());
        }
        else
        {
            $data=$setting->get_data(['send_time','send_price','min_order_price']);
        }
        return view('admin.setting.send_order_price',['data'=>$data]);
    }

    public function shop(Request $request)
    {
        return view('admin.setting.shop');
    }
}
