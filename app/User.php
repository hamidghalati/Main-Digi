<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'name','mobile', 'password','account_status','active_code','role','role_id'
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

    public static function resend($request)
    {
        $active_code = rand(99999, 1000000);
        $mobile = $request->get('mobile');
        if ($request->ajax()) {
           if (\Auth::check())
           {
               $user_id=$request->user->id;
               $row=AdditionalInfos::where('user_id',$user_id)->first();
               $user = User::where(['id' => $user_id])->first();

               if ($row && $row->mobile_phone != $user->mobile)
               {
                   $user = User::where(['id' => $user_id])->first();
                   $user->active_code = $active_code;
                   $user->update();
                   return 'ok';
               }
               else
               {
                   return 'error';
               }

           }
           else{
               $user = User::where(['mobile' => $mobile, 'account_status' => 'InActive'])->first();
               if ($user) {
                   $user->active_code = $active_code;
                   $user->update();
                   return 'ok';
               } else {
                   return 'error';
               }
           }
        } else {
            return 'erroe';
        }
    }

    public static function getData($request)
    {
        $string='?';
        $users=self::with('getRole')->orderBy('id','DESc');
        if (inTrashed($request)){
            $users=$users->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('name',$request)&& !empty($request['name']))
        {
            $users=$users->where('name','like','%'.$request['name'].'%');
            $string=create_paginate_url($string,'name='.$request['name']);
        }
        if (array_key_exists('mobile',$request)&& !empty($request['mobile']))
        {
            $users=$users->where('mobile','like','%'.$request['mobile'].'%');
            $string=create_paginate_url($string,'mobile='.$request['mobile']);
        }
        if (array_key_exists('role',$request)&& !empty($request['role']))
        {
            if ($request['role']=='admin' || $request['role']=='user'){
                $users=$users->where('role',$request['role']);
            }
            else{
                $users=$users->where(['role'=>'user','role_id'=>$request['role']]);
            }
            $string=create_paginate_url($string,'role='.$request['role']);
        }

            $users= $users->paginate(10);
        $users->withPath($string);
        return $users;

    }

    public function getRole(){
        return $this->hasOne(UserRole::class,'id','role_id')->withTrashed();
    }

}
