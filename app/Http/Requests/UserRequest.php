<?php

namespace App\Http\Requests;

use App\Rules\ValidateMobileNumber;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'mobile'=>['required','unique:users,mobile,'.$this->user.'',new ValidateMobileNumber($this->user)]
        ];
        if ($this->role=='admin'){
            $rules['username']=['required','unique:users,username,'.$this->user.''];
        }
        if ($this->method()=="POST")
        {
            $rules['name']=['required'];
            $rules['password']=['required', 'min:8'];
        }

        return $rules;
    }

    public function attributes()
    {

        return [
            'mobile'=>'شماره همراه',
            'name'=>'نام و نام خانوادگی',
            'username'=>'نام کاربری(برای نقش مدیر)',
            'password'=>'کلمه عبور',
        ];


    }
}
