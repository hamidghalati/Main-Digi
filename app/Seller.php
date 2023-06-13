<?php

namespace App;

use App\Notifications\SendSms;
use DB;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class Seller extends Model
{
    use Notifiable;
    protected $fillable=['email','mobile','password','step','active_code','brand_name','fname','lname','province_id','city_id','account_type'];

    public static function first_step_register($request)
    {
        $mobile=$request->get('mobile');
        $password=$request->get('password');
        $email=$request->get('email');


        if (self::check('mobile',$mobile))
        {
            return ['status'=>'error','message'=>'شماره موبایل وارد شده قبلا توسط کاربر دیگری استفاده شده است.'];
        }

        if (self::check('email',$email))
        {
            return ['status'=>'error','message'=>'ایمیل وارد شده قبلا توسط کاربر دیگری استفاده شده است.'];
        }


        DB::table('sellers')->where(['mobile'=>$mobile])->orWhere(['email'=>$email])->delete();

        $active_Code=rand(99999,1000000);

        $seller=new Seller($request->all());
        $seller->active_code=$active_Code;
        $seller->password=Hash::make($password);
        $seller->step=1;
        $seller->save();
        return ['status'=>'ok','step'=>1];


    }

    public static function second_step_register($request)
    {
        $mobile=$request->get('mobile');
        $seller=Seller::where(['mobile'=>$mobile,'step'=>1])->first();
        if ($seller){
            $seller->step=2;
            $seller->update($request->all());

            $code= $seller->active_code;
            $message=config('shop-info.shop_name')."\n";
            $message.='کد تایید';
            $message.=':'.$code;
            $seller->notify(new SendSms($seller->mobile,$message));

            return ['status'=>'ok','step'=>2];
        }
        else{
            return ['status'=>'error','message'=>'خطا در ثبت اطلاعات، مجدداً تلاش نمایید'];
        }
    }

    public static function check($field_name,$value)
    {
        $result=DB::table('sellers')->where([$field_name=>$value,'step'=>4])->first();
        if ($result)
        {
            return true;
        }
        else{
            return false;
        }
    }

    public static function check_active_cod($request)
    {
        $mobile=$request->get('mobile');
        $code=$request->get('code');
        $seller=Seller::where(['mobile'=>$mobile,'step'=>2,'active_code'=>$code])->first();
        if ($seller)
        {
            $seller->step=3;
            $seller->update();
            return ['status'=>'ok'];
        }
        else{
            return ['status'=>'error','message'=>'کد تایید وارد شده اشتباه می باشد'];
        }
    }







}
