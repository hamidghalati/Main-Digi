<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdditionalInfos extends Model
{
    protected $table='additional_infos';
    protected $fillable=['user_id','first_name','last_name','national_identity_number','mobile_phone','email',
    'company_name','company_economic_number','company_registration_number','company_national_identity_number',
    	'company_phone','province_id','city_id','bank_card_number','newsletter'];

    public static function addUserData($user,$request)
    {
        $newsletters=$request->has('newsletter') ? 'yes' : 'no';
        $row=AdditionalInfos::where('user_id',$user->id)->first();
        if ($row)
        {
            $data=$request->all();
            $data['newsletter']=$newsletters;
            $row->update($data);
            $AdditionalInfo=$row;
            $user->name=$request->get('first_name').' '.$request->get('last_name');
            if ($user->mobile!=$row->mobile_phone)
            {
                $active_Code=rand(99999,1000000);
                $user->active_code=$active_Code;
            }

            $user->update();


        }
        else{
            $AdditionalInfo=new AdditionalInfos($request->all());
            $AdditionalInfo->user_id=$user->id;
            $AdditionalInfo->newsletter=$newsletters;
            $AdditionalInfo->save();

            $user->name=$request->get('first_name').' '.$request->get('last_name');
            if ($user->mobile!=$AdditionalInfo->mobile_phone)
            {
                $active_Code=rand(99999,1000000);
                $user->active_code=$active_Code;
            }
            $user->update();

        }

        if ($user->mobile!=$AdditionalInfo->mobile_phone)
        {
            $active_Code=rand(99999,1000000);
            $user->active_code=$active_Code;
            return redirect('/confirmphone')->with('mobile_number',$AdditionalInfo->mobile_phone);
        }
        else
        {
            return redirect()->back()->with('status','اطلاعات با موفقیت ثبت گردید.');
        }
    }



}


