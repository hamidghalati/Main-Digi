<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Seller;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    public function first_step_register(Request $request)
    {
        return Seller::first_step_register($request);
    }
}
