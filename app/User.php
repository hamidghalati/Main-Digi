<?php

namespace App;

use Auth;
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
         'name','mobile', 'password','account_status','active_code','role','role_id','username','forget_password_code'
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
        $forget_password=$request->get('forget_password','no');



        if ($request->ajax()) {
           if (Auth::check())
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
               if ($forget_password=='ok')
               {

                   $user = User::where(['mobile' => $mobile])->first();
                   return $user;
//                   if ($user) {
//                       $user->forget_password_code = $active_code;
//                       $user->update();
//                       return 'ok';
//                   } else {
//                       return 'forget_password_code';
//                   }
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

           }
        } else {
            return 'erroe';
        }
    }

    public static function resend_forget_password($request)
    {
        $active_code = rand(99999, 1000000);
        $mobile = $request->get('mobile');
        echo $mobile;

        if ($request->ajax()) {
            $user = User::where(['mobile' => $mobile])->first();
            if ($user) {
                $user->forget_password_code = $active_code;
                $user->update();
                return 'ok';
            } else {
                return 'error';
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

    public function getAdditionalInfo(){
        return $this->hasOne(AdditionalInfos::class,'user_id','id')->with(['getProvince','getCity']);
    }

    public static function AccessList(){
        $array=array();
        $array['products']=[
          'label'=>'محصولات',
          'access'=>[
              'product_edit'=>['label'=>'ثبت و ویرایش محصولات','routes'=>[
                  'products.index','products.create','products.store','products.edit','products.update'
              ]],
              'remove_product'=>['label'=>'حذف محصولات','routes'=>['products.index','products.destroy']],
              'restore_product'=>['label'=>'بازیابی محصولات','routes'=>['products.index','products.restore']],
          ]
        ];
        $array['sliders']=[
          'label'=>'اسلایدرها',
          'access'=>[
              'slider_edit'=>['label'=>'ثبت و ویرایش اسلایدر','routes'=>[
                  'sliders.index','sliders.create','sliders.store','sliders.edit','sliders.update'
              ]],
              'remove_slider'=>['label'=>'حذف اسلایدر','routes'=>['sliders.index','sliders.destroy']],
              'restore_slider'=>['label'=>'بازیابی اسلایدرها','routes'=>['sliders.index','sliders.restore']],
          ]
        ];
        $array['stockrooms']=[
          'label'=>'انبار',
          'access'=>[
              'stockroom_edit'=>['label'=>'مدیریت انبارها','routes'=>[
                  'stockrooms.index','stockrooms.create','stockrooms.store','stockrooms.edit','stockrooms.update','stockrooms.show'
              ]],
              'add_input'=>['label'=>'ثبت ورودی انبار','routes'=>['stockroom.input','stockroom.show_input','stockroom.add_product','stockroom.add_input','get_product_warranty']],
              'add_output'=>['label'=>'ثبت خروجی انبار','routes'=>['stockroom.output','stockroom.show_output','stockroom.add_product','stockroom.add_output','get_inventory']],
          ]
        ];

        return $array;

    }

    public function getEmailForPasswordReset()
    {
        return $this->mobile;
    }


}
