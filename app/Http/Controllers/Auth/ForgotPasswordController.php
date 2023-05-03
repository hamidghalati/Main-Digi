<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Lib\MobileDetect;
use App\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Session;


class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */
    protected $view='';

    use SendsPasswordResetEmails;

    public function __construct()
    {
        $this->middleware('guest');
        $detect=new MobileDetect();
        if ($detect->isMobile() || $detect->isTablet())
        {
            $this->view='mobile.';
        }
    }

    public function confirm()
    {
        $token=Session::get('forget_password_token');
        $mobile=Session::get('mobile');

        if ($token && $mobile)
        {
            $layout=$this->view=='mobile.' ? 'mobile-auth' : 'auth';
            $margin=$this->view=='mobile.' ? '10' : '25';
            return view('auth/passwords/confirm',['mobile'=>$mobile,'margin'=>$margin,'layout'=>$layout]);
        }
        else{
            return redirect()->back()->with('danger', 'شماره وارد شده اشتباه می باشد')->withInput();
        }
    }

    public function check_confirm_code(Request $request)
    {
        $mobile=$request->get('mobile');
        $token=Session::get('forget_password_token');
        $forget_password_code=$request->get('forget_password_code');
        $user=User::where(['forget_password_code'=>$forget_password_code,'mobile'=>$mobile])->first();
        if ($user)
        {
            $user->forget_password_code=null;
            $user->update();
            Session::forget('forget_password_token');
            return redirect('/password/reset/'.$token.'?mobile='.$mobile);
        }
        else{
            return redirect()->back()->with('mobile', $mobile)->with(['token'=>$token])->with('danger', 'کد وارد شده اشتباه می باشد')->withInput();
        }

    }
}
