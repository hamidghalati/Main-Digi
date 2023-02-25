<?php

namespace App\Http\Controllers;

use App\Address;
use Illuminate\Http\Request;

class UserController extends Controller
{
   public function addAddress(Request $request)
   {
      return Address::addUserAddress($request);
   }
   public function removeAddress($id,Request $request)
   {
       $user_id=$request->user()->id;
       $delete=Address::where(['user_id'=>$user_id,'id'=>$id])->delete();
       if ($delete)
       {
           return Address::with(['getProvince','getCity'])->where(['user_id'=>$user_id])->orderBy('id','Desc')->get();

       }
       else{
           return 'error';
       }
   }

    public function getAddress(Request $request)
    {
        $user_id=$request->user()->id;
        $userAddress=Address::with(['getCity','getProvince'])
            ->where('user_id',$user_id)
            ->orderBy('id','desc')
            ->paginate(10);
        return $userAddress;
    }
}
