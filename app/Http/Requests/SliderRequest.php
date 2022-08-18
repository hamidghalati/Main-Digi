<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SliderRequest extends FormRequest
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
          'title'=>'required',
          'link'=>'required|url',

        ];
        if ($this->method()=='PUT')
        {
            if (!empty($this->request->get('pic'))){
                $array['pic']='image';
            }

        }
        else
        {
            $array['pic']='required|image';
        }
        if (!empty($this->request->get('mobile_pic')))
        {
            $array['mobile_pic']='image';
        }
        return $array;
    }

    public function attributes()
    {
        return [
            'title'=>'عنوان اسلایدر',
            'link'=>'لینک اسلایدر',
            'pic'=>'تصویر اسلایدر',
             'mobile_pic'=>'تصویر اسلایدر مربوط به موبایل'
        ];
    }
}
