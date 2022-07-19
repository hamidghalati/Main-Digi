<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
}
