<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Offers;
use App\ProductWarranty;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin.index');
    }
    public function incredible_offers()
    {
        return view('admin.incredible-offers');
    }
    public function getWarranty()
    {
        $productWarranty=ProductWarranty::with(['getColor','getProduct','getWarranty'])
            ->orderBy('id','DESC')
            ->whereHas('getWarranty')
            ->whereHas('getProduct')
            ->paginate(10);
        return $productWarranty;
    }

    public function add_incredible_offers($id,Request $request)
    {
        $productWarranty=ProductWarranty::find($id);
        if ($productWarranty)
        {
        $offers=new Offers();
        $res=$offers->add($request,$productWarranty);
        return $res;

       }
        else
        {
            return 'error';
        }

    }
}
