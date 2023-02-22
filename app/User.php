<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'name','mobile', 'password','account_status','active_code','role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function changeMobileNumber($request)
    {
        $mobile = $request->get('mobile');
        $active_code = $request->get('active_code');
        $user_id=$request->user()->id;
        $AdditionalInfo=AdditionalInfos::where(['user_id'=>$user_id,'mobile_phone'=>$mobile])->first();
        if ($AdditionalInfo)
        {
            $user=User::find($user_id);
            if ($active_code==$user->active_code)
            {
                $user->mobile=$AdditionalInfo->mobile_phone;
                $user->update();
                return redirect('user/profile/additional-info')->with('status','اطلاعات با موفقیت ثبت گردید.');
            }
            else
            {
                return redirect()->back()->with('mobile_number',$mobile)->with(['validate_error'=>'کد فعال سازی وارد شده اشتباه می باشد']);
            }
        }
        else{
            return redirect('/');
        }

    }
}
