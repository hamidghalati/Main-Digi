<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Lib\MobileDetect;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Lang;



class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo ='/';
    protected $view='';
    protected $vue_login=false;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $detect=new MobileDetect();
        if ($detect->isMobile() || $detect->isTablet())
        {
            $this->view='mobile.';
        }
    }

    public function vue_login(Request $request)
    {
        if ($request->header('X-Xsrf-Token',null)){
            $this->vue_login=true;
            if (method_exists($this, 'hasTooManyLoginAttempts') && $this->hasTooManyLoginAttempts($request))
            {
                $this->fireLockoutEvent($request);
                $seconds = $this->limiter()->availableIn(
                    $this->throttleKey($request)
                );

                $message=Lang::get('auth.throttle', [
                    'seconds' => $seconds,
                    'minutes' => ceil($seconds / 60),
                ]);
                return ['status'=>$message];
            }
            if ($this->attemptLogin($request)) {
                $request->session()->regenerate();

                $this->clearLoginAttempts($request);

                return ['status'=>'ok'];
            }
            else{
                $this->incrementLoginAttempts($request);
                return ['status'=>'شماره موبایل یا کلمه عبور اشتباه می باشد.'];
            }
        }

    }
}
