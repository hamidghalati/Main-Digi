<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrandRequest extends FormRequest
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
        $array=[
            'brand_name'=>'required',
            'brand_ename'=>'required',
            'pic'=>'image'
      ];
        return $array;
    }

    public function attributes()
    {
        return [
            'brand_name'=>'نام برند',
            'brand_ename'=>'نام انگلیسی برند',
            'pic'=>'آیکن برند'
        ];
    }


}
