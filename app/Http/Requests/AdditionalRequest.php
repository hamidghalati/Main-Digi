<?php

namespace App\Http\Requests;

use App\Rules\BankCode;
use App\Rules\NationalCode;
use App\Rules\ValidateMobileNumber;
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
            'national_identity_number'=>['required',new NationalCode()],
            'mobile_phone'=>['required',new ValidateMobileNumber()],
        ];
        if (!empty($this->bank_card_number)){
            $rules['bank_card_number']=['string','size:16',new BankCode()];
        }
        if (!empty($this->email)){
            $rules['email']=['required','email'];
        }
        if ($this->legal=='true')
        {
            $rules['company_name']=['required'];
            $rules['company_economic_number']=['required'];
            $rules['company_registration_number']=['required'];
            $rules['company_national_identity_number']=['required','numeric','size:11'];
            $rules['company_phone']=['required'];
            $rules['city_id']=['required'];
            $rules['province_id']=['required'];
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
            'bank_card_number'=>'شماره کارت',
            'company_name'=>'نام شرکت',
            'company_economic_number'=>'کد اقتصادی',
            'company_registration_number'=>'شناسه ثبت',
            'company_national_identity_number'=>'شناسه حقیقی',
            'company_phone'=>'شماره تلفن ثابت',
            'city_id'=>'نام شهر',
            'province_id'=>'نام استان',
            'email'=>'پست الکترونیک',
        ];
    }
}
