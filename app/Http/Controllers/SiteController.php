<?php

namespace App\Http\Controllers;

use App\BrandsModel;
use App\Cart;
use App\CatBrand;
use App\CategoriesModel;
use App\ColorModel;
use App\ItemValueModel;
use App\ProductsModel;
use App\ProductWarranty;
use App\SearchProduct;
use App\SliderModel;
use App\ItemModel;
use App\User;
use Auth;
use DB;
use Illuminate\Http\Request;
use Session;

class SiteController extends Controller
{
    public function __construct()
    {
        getCatList();
    }

    public function index()
    {

        $sliders = SliderModel::orderBy('id', 'desc')->get();
        $incredible_offers = ProductWarranty::with('getProduct.getCat')
            ->with(['itemValue' => function ($query) {
                $query->whereHas('important_item')->with('important_item');
            }])
            ->where(['offers' => 1])
            ->limit(9)
            ->get()
            ->unique('product_id');

        $new_product = ProductsModel::where('status', 1)->orderby('id', 'DESC')->limit(10)->get();
        $best_selling_product = ProductsModel::where('status', 1)->orderby('order_number', 'DESC')->limit(10)->get();


        return view('shop.index', [
            'sliders' => $sliders,
            'incredible_offers' => $incredible_offers,
            'new_product' => $new_product,
            'best_selling_product' => $best_selling_product
        ]);
    }

    public function show_product($product_id, $product_url = null)
    {
        $id = str_replace('dkp-', '', $product_id);
        $where = ['id' => $id];
        if ($product_url != null) {
            $where['product_url'] = $product_url;
        }
        $product = ProductsModel::with('getBrand', 'getProductColor.getColor', 'getWarranty', 'getCat')->where($where)->firstOrFail();
        $product_item = ItemModel::getProductItem($product);
        $product_item_count = ItemValueModel::where('product_id', $product->id)->count();
        $relate_product = ProductsModel::where(['cat_id' => $product->cat_id, 'brand_id' => $product->brand_id])
            ->where('id', '!=', $product->id)->limit(15)->get();
        return view('shop.show_product', [
            'product' => $product,
            'product_item' => $product_item,
            'product_item_count' => $product_item_count,
            'relate_product' => $relate_product

        ]);
    }

    public function change_color(Request $request)
    {
        $color_id = $request->get('color_id');
        $product_id = $request->get('product_id');
        $product = ProductsModel::with(['getWarranty', 'getProductColor.getColor'])
            ->where(['id' => $product_id])->first();
        $check_has_color = ProductWarranty::where(['color_id' => $color_id, 'product_id' => $product_id])
            ->where('product_number', '>', 0)
            ->first();
        if ($product && $check_has_color) {
            return view('include.warranty', ['product' => $product, 'color_id' => $color_id]);
        } else {
            return false;
        }


    }

    public function confirm()
    {
        if (Session::has('mobile_number')) {
            return view('auth.confirm');
        } else {
            return redirect('/');
        }
    }

    public function resend(Request $request)
    {
        $active_code = rand(99999, 1000000);
        $mobile = $request->get('mobile');
        if ($request->ajax()) {
            $user = User::where(['mobile' => $mobile, 'account_status' => 'InActive'])->first();
            if ($user) {
                $user->active_code = $active_code;
                $user->update();
                return 'ok';
            } else {
                return 'error';
            }
        } else {
            return 'erroe';
        }
    }

    public function active_account(Request $request)
    {
        $mobile = $request->get('mobile');
        $active_code = $request->get('active_code');
        $user = User::where(['mobile' => $mobile, 'active_code' => $active_code, 'account_status' => 'InActive'])->first();
        if ($user) {
            $user->account_status = 'active';
            $user->active_code = null;
            $user->update();
            Auth::guard()->login($user);
            return redirect('/');

        } else {
            return redirect()->back()->with('mobile_number', $mobile)->with('validate_error', 'کد وارد شده اشتباه می باشد')->withInput();
        }
    }

    public function add_cart(Request $request)
    {
        Cart::add_cart($request->all());
        return redirect('/Cart');

    }

    public function show_cart()
    {
        $cart_data = Cart::getCartData();
        return view('shop.cart', ['cart_data' => $cart_data]);
    }

    public function remove_product(Request $request)
    {
        return Cart::removeProduct($request);
    }

    public function change_product_cart(Request $request)
    {
        return Cart::ChangeProductCount($request);
    }

    public function show_child_cat_list($cat_url)
    {
        $category = CategoriesModel::with('getChild')
            ->where('url', $cat_url)
            ->firstOrFail();
        return view('shop.child_cat', ['category' => $category]);
    }

    public function cat_product($cat_url, Request $request)
    {
        $category = CategoriesModel::with('getParent.getParent')
            ->with(['getChild'=>function($query){
                $query->whereNull('search_url');
            }])
            ->where('url', $cat_url)
            ->firstOrFail();
        $filter = CategoriesModel::getCatFilter($category);
        $brands = CatBrand::with('getBrand')->where('cat_id', $category->id)->get();

        $colors = [];
        $checkHasColor = DB::table('product_color')->where('cat_id', $category->id)->first();
        if ($checkHasColor) {
            $colors = ColorModel::get();
        }
        return view('shop.cat_product', ['filter' => $filter, 'category' => $category, 'brands' => $brands, 'colors' => $colors]);

    }

    public function get_cat_product($cat_id, Request $request)
    {
        $category = CategoriesModel::with('getChild.getChild')
            ->where('url', $cat_id)
            ->whereNull('search_url')
            ->firstOrFail();
        $searchProduct = new SearchProduct($request);
        $searchProduct->set_product_category($category);
        $searchProduct->brands = $request->get('brand', null);

        $result = $searchProduct->getProduct();
        return $result;
    }

    public function brand_product($brand_name)
    {
        $brand=BrandsModel::with('getCat.getCategory')->where('brand_ename',$brand_name)->firstOrFail();
        return view('shop.brand_product',['brand'=>$brand]);

    }

    public function get_brand_product($brand_name,Request $request)
    {
        $brand=BrandsModel::where('brand_ename',$brand_name)->firstOrFail();
        $searchProduct = new SearchProduct($request);
        $searchProduct->brands = $brand->id;
//        $searchProduct->category=$request->get('category');
        $searchProduct->set_brand_category($request->get('category',array()));
        $result = $searchProduct->getProduct();

        return $result;
    }


}






//$brand=BrandsModel::where('brand_ename',$brand_name)->firstOrFail();
//$searchProduct = new SearchProduct($request);
//$searchProduct->brands = $brand->id;
//$searchProduct->set_brand_category($request->get('category'));
//$result = $searchProduct->getProduct();
//
//return $result;
