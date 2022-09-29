<?php

namespace App\Http\Controllers\User;

use App\GiftCart;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserPanelController extends Controller
{
    public function __construct()
    {
        getCatList();
    }
    public function gift_cart(Request $request)
    {
        $user_id=$request->user()->id;
        $gift_cart=GiftCart::where('user_id',$user_id)->orderBy('id','DESC')->paginate(10);
        return view('userPanel.gift_cart',['gift_cart'=>$gift_cart]);
    }
}
