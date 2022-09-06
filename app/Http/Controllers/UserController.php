<?php

namespace App\Http\Controllers;

use App\Address;
use Illuminate\Http\Request;

class UserController extends Controller
{
   public function addAddress(Request $request)
   {
       $user_id=$request->user()->id;
       $address=new Address($request->all());
       $address->user_id=$user_id;
       if ($address->save())
       {
           return Address::where(['user_id'=>$user_id])->orderBy('id','Desc')->get();
       }
       else{
           return 'error';
       }

   }
}
