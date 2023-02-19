<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdditionalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules=[
            'first_name'=>'required',
            'last_name'=>'required',
            'national_identity_number'=>'required',
            'mobile_phone'=>'required',
        ];
        if (!empty($this->bank_card_number)){
            $rules['bank_card_number']=['string','size:16'];
        }
        return $rules;
    }

    public function attributes()
    {

        return [
            'first_name'=>'نام',
            'last_name'=>'نام خانوادگی',
            'national_identity_number'=>'کد ملی',
            'mobile_phone'=>'شماره همراه',
            'bank_card_number'=>'شماره کارت'
        ];
    }
}
