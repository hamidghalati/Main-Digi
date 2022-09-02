<?php

namespace App\Http\Controllers;

use App\Cart;
use App\ProvinceModel;
use Illuminate\Http\Request;

class ShoppingController extends Controller
{
    public function shipping()
    {
        if (Cart::get_product_count()>0)
        {
            return view('shipping.set_data');
        }
        else
        {
            return redirect('/');
        }
    }

}
