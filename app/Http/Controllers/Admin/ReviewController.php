<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\ProductsModel;
use App\ReView;
use Barryvdh\Debugbar\LaravelDebugbar;
use DB;
use Illuminate\Http\Request;

class ReviewController extends CustomController
{
    protected $model='Review';
    protected $title='نقد و بررسی';
    protected $route_params='product/review';
    protected $product;
    protected $query_string;


    public function __construct(Request $request)
    {
        $product_id=$request->get('product_id');
        $this->product=ProductsModel::findOrFail($product_id);
        $this->query_string='product_id='.$product_id;
    }

    public function index(Request $request)
    {
        $review=ReView::getData($request->all());
        $trash_count=ReView::onlyTrashed()->count();
        return view('admin.review.index',['review'=>$review,'trash_count'=>$trash_count,'product'=>$this->product]);
    }

    public function create()
    {
        return view('admin.review.create',['product'=>$this->product]);
    }

    public function store(Request $request)
    {
        $this->validate($request,['title'=>'required','tozihat'=>'required'],[],[
           'title'=>'نقد و بررسی',
           'tozihat'=>'توضیحات'
        ]);

        $review=new ReView($request->all());
        $review->product_id=$this->product->id;
        $review->saveOrFail();
        return redirect('admin/product/review?product_id='.$this->product->id)->with(['message'=>'ثبت نقد و بررسی با موفقیت انجام شد','header'=>'ثبت نقد و بررسی','alerts'=>'success']);

    }

    public function edit($id)
    {
        $review=ReView::findOrFail($id);
        return view('admin.review.edit',[
            'review'=>$review,
            'product'=>$this->product
        ]);
    }

    public function update(Request $request,$id)
    {
        $review=ReView::findOrFail($id);
        $this->validate($request,['title'=>'required','tozihat'=>'required'],[],[
            'title'=>'نقد و بررسی',
            'tozihat'=>'توضیحات'
        ]);
        $review->update($request->all());

        return redirect('admin/product/review?product_id='.$this->product->id)
            ->with(['message'=>'ویرایش نقد و بررسی  با موفقیت انجام شد','header'=>'ویرایش نقد و بررسی','alerts'=>'info']);
    }

    public function primary()
    {
        $primary_content=ReView::whereNull('title')->where('product_id',$this->product->id)->first();
        $tozihat=$primary_content ? $primary_content->tozihat : '';
        return view('admin.review.primary',['product'=>$this->product,'tozihat'=>$tozihat]);
    }

    public function add_primary_content(Request $request)
    {
        DB::table('review_product')
            ->whereNull('title')
            ->where('product_id',$this->product->id)
            ->delete();
        if (!empty($request->get('tozihat')))
        {
            $review=new ReView($request->all());
            $review->product_id=$this->product->id;
            $review->saveOrFail();
        }
        return redirect('admin/product/review?product_id='.$this->product->id)->with(['message'=>'ثبت توضیحات با موفقیت انجام شد','header'=>'ثبت نقد و بررسی','alerts'=>'success']);

    }
}
