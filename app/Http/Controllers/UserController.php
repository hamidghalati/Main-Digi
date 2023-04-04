<?php

namespace App\Http\Controllers;

use App\Address;
use App\Favorite;
use App\Mail\SendAnswer;
use App\Question;
use Illuminate\Http\Request;
use Mail;

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
           $AddressList=Address::with(['getProvince','getCity'])->where(['user_id'=>$user_id])->orderBy('id','Desc');

           if ($request->get('paginate')=='ok'){
               $AddressList=$AddressList->paginate(10);
           }
           else
           {
               $AddressList=$AddressList->get();
           }
           return $AddressList;

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

    public function addQuestion(Request $request){
       $send_email=$request->get('send_email')=="true" ? 'ok' : 'no';
       $user_id=$request->user()->id;
       $Question=new Question($request->all());

       $Question->time=time();
       $Question->user_id=$user_id;
       $Question->send_email=$send_email;
       $Question->save();

       return 'ok';
    }

    public function add_favorite(Request $request)
    {
        if ($request->ajax())
        {
            $product_id=$request->get('product_id');
            $user_id=$request->user()->id;
            $favorite=Favorite::where(['product_id'=>$product_id,'user_id'=>$user_id])->first();
            if ($favorite){
                $favorite->delete();
                return 'ok';
            }
            else{
                $favorite=new Favorite($request->all());
                $favorite->user_id=$user_id;
                $favorite->saveOrFail();
                return 'ok';
            }
        }
        else{
            return redirect('/');
        }
    }
}
