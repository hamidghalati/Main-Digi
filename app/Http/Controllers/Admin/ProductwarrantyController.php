<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\WarrantyRequest;
use App\ProductColorModel;
use App\ProductsModel;
use App\ProductWarranty;
use App\WarrantyModel;
use Barryvdh\Debugbar\LaravelDebugbar;
use Illuminate\Http\Request;

class ProductwarrantyController extends CustomController
{

    protected $model='ProductWarranty';
    protected $title='تنوع قیمت';
    protected $route_params='Product_warranties';
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
        $product_warranty=ProductWarranty::getDate($request->all());
        $trash_count=ProductWarranty::onlyTrashed()->count();
        return view('admin.product_warranties.index',
            [
                'product_warranty'=>$product_warranty,
                'trash_count'=>$trash_count,
                'product'=>$this->product,
                'req'=>$request
                ]);

    }


    public function create()
    {
        $warranty=WarrantyModel::orderby('id','desc')->pluck('name','id')->toArray();
        $colors=ProductColorModel::with('getColor')->where('product_id',$this->product->id)->get();
        return view('admin.product_warranties.create',[
            'warranty'=>$warranty,
            'colors'=>$colors,
            'product'=>$this->product

        ]);
    }


    public function store(WarrantyRequest $request)
    {
        $check=ProductWarranty::where([
            'seller_id'=>0,
            'warranty_id'=>$request->get('warranty_id'),
            'product_id'=>$request->get('product_id'),
            'color_id'=>$request->get('color_id')
        ])->first();
        if (!$check)
        {
            $warranty=new ProductWarranty($request->all());
            $warranty->saveOrFail();
            add_min_product_price($warranty);
            update_product_price($this->product);
            return redirect('admin/Product_warranties?product_id='.$this->product->id)->with(['message'=>'تنوع قیمت با موفقیت انجام شد','header'=>'تنوع قیمت','alerts'=>'success']);

        }
        else
        {
            return redirect()->back()->withInput()->with(['message'=>'تنوع قیمت با مشخصات فوق از قبل ثبت شده است','header'=>'تنوع قیمت','alerts'=>'warning']);

        }

    }




    public function edit($id)
    {
        $product_warranties=ProductWarranty::findOrFail($id);
        $warranty=WarrantyModel::orderby('id','desc')->pluck('name','id')->toArray();
        $colors=ProductColorModel::with('getColor')->where('product_id',$this->product->id)->get();
        return view('admin.product_warranties.edit',[
            'warranty'=>$warranty,
            'colors'=>$colors,
            'product'=>$this->product,
            'product_warranties'=>$product_warranties
        ]);
    }


    public function update(WarrantyRequest $request, $id)
    {
        $product_warranties=ProductWarranty::findOrFail($id);
        $product_warranties->update($request->all());
        update_product_price($this->product);
        add_min_product_price($product_warranties);
        return redirect('admin/Product_warranties?product_id='.$this->product->id)
            ->with(['message'=>'ویرایش اطلاعات با موفقیت انجام شد','header'=>'ویرایش اطلاعات','alerts'=>'info']);


    }

}
