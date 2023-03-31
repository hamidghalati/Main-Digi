<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Offers;
use App\ProductWarranty;
use DB;
use Illuminate\Database\Eloquent\Builder;
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

    public function getWarranty(Request $request)
    {
        $search_text=$request->get('search_text','');
        $productWarranty=ProductWarranty::with(['getColor','getProduct','getWarranty'])
            ->orderBy('offers','DESC');
            $productWarranty=$productWarranty->whereHas('getWarranty');


            if (empty(trim($search_text)))
            {
                $productWarranty=$productWarranty->whereHas('getProduct');
            }
            else
            {
                define('search_text',$search_text);
                $productWarranty=$productWarranty->whereHas('getProduct',function (Builder $query){
                    $query->where('title','like','%'.search_text.'%');
                });
            }

        $productWarranty=$productWarranty->paginate(10);
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

    public function remove_incredible_offers($id)
    {
        $productWarranty=ProductWarranty::find($id);
        if ($productWarranty) {
            $offers=new Offers();
            $res=$offers->remove($productWarranty);
            return $res;
        }
        else
        {
            return 'error';
        }
    }

    public function file_manager()
    {
        return view('admin.file_manager');
    }

    public function admin_login_form()
    {
        return view('admin.admin_login_form');
    }




}
