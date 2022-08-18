<?php

namespace App\Http\Controllers;

use App\CategoriesModel;
use App\ProductsModel;
use App\ProductWarranty;
use App\SliderModel;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function __construct()
    {
        getCatList();
    }

    public function index()
    {

        $sliders=SliderModel::orderBy('id','desc')->get();
        $incredible_offers=ProductWarranty::with('getProduct.getCat')
            ->with(['itemValue'=>function($query){
                $query->whereHas('important_item')->with('important_item');
            }])
            ->where(['offers'=>1])
            ->limit(9)
            ->get()
            ->unique('product_id');

        $new_product=ProductsModel::where('status',1)->orderby('id','DESC')->limit(10)->get();
        $best_selling_product=ProductsModel::where('status',1)->orderby('order_number','DESC')->limit(10)->get();


        return view('shop.index',[
            'sliders'=>$sliders,
            'incredible_offers'=>$incredible_offers,
            'new_product'=>$new_product,
            'best_selling_product'=>$best_selling_product
        ]);
    }

    public function show_product($product_id,$product_url=null)
    {
        $id=str_replace('dkp-','',$product_id);
        $where=['id'=>$id];
        if ($product_url!=null)
        {
            $where['product_url']=$product_url;
        }
        $product=ProductsModel::with('getBrand','getProductColor.getColor','getWarranty','getWarranty','getCat')->where($where)->firstOrFail();
        return view('shop.show_product',['product'=>$product]);
    }
}
