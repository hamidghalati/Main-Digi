<?php

namespace App\Http\Controllers;

use App\BrandsModel;
use App\Cart;
use App\CatBrand;
use App\CategoriesModel;
use App\ColorModel;
use App\Comment;
use App\Favorite;
use App\ItemValueModel;
use App\Lib\MobileDetect;
use App\Mail\ShareEmail;
use App\Page;
use App\ProductsModel;
use App\ProductWarranty;
use App\Question;
use App\ReView;
use App\SearchProduct;
use App\SliderModel;
use App\ItemModel;
use App\User;
use Auth;
use DB;
use Illuminate\Http\Request;
use Mail;
use Session;

class SiteController extends Controller
{
    protected $view='';

    public function __construct()
    {
        getCatList();

        $detect=new MobileDetect();
        if ($detect->isMobile() || $detect->isTablet())
        {
            $this->view='mobile.';
        }
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

        $randomProduct=ProductsModel::where('status', 1)
            ->inRandomOrder()
            ->limit(10)
            ->select(['id','title','price','image_url','product_url','discount_price'])
            ->get();


        return view($this->view.'shop.index', [
            'sliders' => $sliders,
            'incredible_offers' => $incredible_offers,
            'new_product' => $new_product,
            'best_selling_product' => $best_selling_product,
            'randomProduct'=>$randomProduct
        ]);
    }

    public function show_product($product_id, $product_url = null)
    {
        $id = str_replace('dkp-', '', $product_id);
        $where = ['id' => $id];
        if ($product_url != null) {
            $where['product_url'] = $product_url;
        }
        $product = ProductsModel::with('getBrand','Gallery', 'getProductColor.getColor', 'getWarranty', 'getCat')->where($where)->firstOrFail();
        $product_item = ItemModel::getProductItem($product);
        $product_item_count = ItemValueModel::where('product_id', $product->id)->count();
        $relate_product = ProductsModel::where(['cat_id' => $product->cat_id, 'brand_id' => $product->brand_id])
            ->where('id', '!=', $product->id)->limit(15)->get();
        $review=ReView::where('product_id',$product->id)->get();

        $comment_count=0;
        $useful_comment=null;
        if ($this->view=='mobile.'){
            $comment_count=Comment::where(['product_id'=>$product->id,'status'=>1])->count();
            $useful_comment=Comment::with('getUserInfo')->where(['product_id'=>$product->id,'status'=>1])->orderBy('like','DESC')->limit(2)->get();
        }

        $favorite=null;
        if (Auth::check()){
            $user_id=Auth::user()->id;
            $favorite=Favorite::where(['product_id'=>$product->id,'user_id'=>$user_id])->first();
        }

        $category=CategoriesModel::with(['getParent.getParent'])->where('id',$product->cat_id)->first();

        return view($this->view.'shop.show_product', [
            'product' => $product,
            'product_item' => $product_item,
            'product_item_count' => $product_item_count,
            'relate_product' => $relate_product,
            'review'=>$review,
            'comment_count'=>$comment_count,
            'useful_comment'=>$useful_comment,
            'favorite'=>$favorite,
            'category'=>$category
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
            $layout=$this->view=='mobile.' ? 'mobile-auth' : 'auth';
            $margin=$this->view=='mobile.' ? '10' : '25';
            return view('auth.confirm',['layout'=>$layout,'margin'=>$margin]);
        } else {
            return redirect('/');
        }
    }

    public function confirmphone()
    {
        if (Session::has('mobile_number')) {
            $layout=$this->view=='mobile.' ? 'mobile-auth' : 'auth';
            $margin=$this->view=='mobile.' ? '10' : '25';
            return view('auth.confirmphone',['layout'=>$layout,'margin'=>$margin]);
        } else {
            return redirect('/');
        }
    }

    public function resend(Request $request)
    {
        return User::resend($request);
    }

    public function resend_forget_password(Request $request)
    {
        return User::resend_forget_password($request);
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

    public function changeMobileNumber(Request $request)
    {
        return User::changeMobileNumber($request);
    }

    public function add_cart(Request $request)
    {
        Cart::add_cart($request->all());
        return redirect('/Cart');

    }

    public function show_cart()
    {
        $cart_data = Cart::getCartData();
        return view($this->view.'shop.cart', ['cart_data' => $cart_data]);
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
        return view($this->view.'shop.cat_product', ['filter' => $filter, 'category' => $category, 'brands' => $brands, 'colors' => $colors]);

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
        return view($this->view.'shop.brand_product',['brand'=>$brand]);

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

    public function compare($product1,$product2=null,$product3=null,$product4=null)
    {
        $items=[];

        $products_id=get_compare_product_id(array($product1,$product2,$product3,$product4));
        $products=ProductsModel::with(['getItemValue','Gallery'])
            ->whereIn('id',$products_id)
            ->select(['id','title','cat_id','price','product_url'])
            ->get();
        if(sizeof($products)>0)
        {
            $items=ItemModel::getCategoryItem($products[0]->cat_id);
            $category=CategoriesModel::where('id',$products[0]->cat_id)->firstOrFail();
            return view('shop.compare',[
                'items'=>$items,
                'products'=>$products,
                'category'=>$category
            ]);
        }
        else{
            return redirect('/');
        }

    }

    public function get_compare_products(Request $request)
    {
        $brand_id=$request->get('brand_id',0);
        $cat_id=$request->get('cat_id',0);
        $search_text=$request->get('search_text');
        $products=ProductsModel::where('cat_id',$cat_id)
            ->select(['id','price','image_url','title']);
        if ($brand_id>0)
        {
            $products=$products->where('brand_id',$brand_id);
        }
        if ($search_text)
        {
            $products=$products->where('title','like','%'.$search_text.'%');
        }
        $products=$products->orderBy('order_number','DESC')->paginate(10);
        return $products;
    }

    public function getCatBrand(Request  $request)
    {
        $cat_id=$request->get('cat_id',0);
        $brands = CatBrand::with('getBrand')->where('cat_id', $cat_id)->get();
        return $brands;
    }

    public function comment_form($product_id)
    {
        $product=ProductsModel::findOrFail($product_id);
        return view($this->view.'shop.comment_form',['product'=>$product]);
    }

    public function add_comment($product_id,Request $request)
    {
        $product=ProductsModel::findOrFail($product_id);
        $status=Comment::addComment($request,$product);
        return redirect('product/dkp-'.$product->id.'/'.$product->product_url)->with('comment_status',$status['status']);
    }

    public function CartProductData()
    {
        return Cart::getCartData();
    }

    public function get_question($product_id,Request $request){
        $ordering=$request->get('ordering','new');
        $Question=Question::with(['getUser','getAnswer.getUser'])->where(['questions_id'=>0,'product_id'=>$product_id,'status'=>1]);
        if ($ordering=='new')
        {
            $Question=$Question->orderBy('id','DESC');
        }
        else if ($ordering=='answer_count')
        {
            $Question=$Question->orderBy('answer_count','DESC');
        }
        else if ($ordering=='user' && Auth::check())
        {
            $user_id=$request->user()->id;
            $Question=$Question->orderByRaw(DB::raw("FIELD(user_id,".$user_id.") DESC"));
        }
        else{
            $Question=$Question->orderBy('id','DESC');
        }
        $Question=$Question->paginate(10);
        return $Question;
    }

    public function share_product(Request $request)
    {
       if ($request->ajax())
       {
           $email=$request->get('email');
           $product_id=$request->get('product_id');
           $user_name=(Auth::check() && !empty(Auth::user()->name)) ? Auth::user()->name : 'کاربر ناشناس';
           $product=ProductsModel::where('id',$product_id)->select(['id','title','price','image_url','product_url'])->first();

           if ($product)
           {
               try {
                   Mail::to($email)->send(new ShareEmail($user_name,$product));
                   return 'ok';
               }
               catch (\Exception $exception)
               {
                   return 'error';
               }
           }
           else{
               return 'error';
           }

       }


    }

    public function page($url)
    {
        $page=Page::where(['url'=>$url])->firstOrFail();
        return view($this->view.'shop.page',['page'=>$page]);
    }









}






