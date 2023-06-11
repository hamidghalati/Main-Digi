<?php

namespace App;

use DB;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Seller extends Model
{
    protected $fillable=['email','mobile','password','step','active_code'];

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







}
