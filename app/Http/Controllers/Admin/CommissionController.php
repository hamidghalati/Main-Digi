<?php

namespace App\Http\Controllers\admin;

use App\BrandsModel;
use App\CategoriesModel;
use App\Commission;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommissionController extends CustomController
{
    protected $model='Commission';
    protected $title='کمیسیون';
    protected $route_params='commissions';

    public function index(Request $request)
    {
        $commission=Commission::getData($request->all());
        $trash_count=Commission::onlyTrashed()->count();
        $category=CategoriesModel::get_parent2();
        $brand=[''=>'انتخاب برند']+BrandsModel::pluck('brand_name','id')->toArray();
        return view('admin.commission.index',[
            'commission'=>$commission,
            'trash_count'=>$trash_count,
            'req'=>$request,
            'category'=>$category,
            'brand'=>$brand
        ]);
    }

    public function create()
    {
        $category=CategoriesModel::get_parent2();
        $brand=[''=>'انتخاب برند']+BrandsModel::pluck('brand_name','id')->toArray();
        return view('admin.commission.create',['category'=>$category,'brand'=>$brand]);
    }

    public function store(Request $request)
    {
        $this->validate($request,[
            'cat_id'=>'required',
            'brand_id'=>'required',
            'percentage'=>'required|numeric'
        ],[],['cat_id'=>'گروه محصولات','brand_id'=>'برند','percentage'=>'درصد کمیسیون']);

        $cat_id=$request->get('cat_id');
        $brand_id=$request->get('brand_id');

        $row=Commission::where(['cat_id'=>$cat_id,'brand_id'=>$brand_id])->first();
        if ($row)
        {
            return redirect()->back()->withInput()->with(['message'=>'برای دسته و برند انتخاب شده قبلاً درصد کمیسیون ثبت شده','header'=>'هشدار','alerts'=>'warning']);
        }
        else{
            $commission=new Commission($request->all());
            $commission->saveOrFail();
            return redirect('admin/commissions')->with(['message'=>'ثبت  کمیسیون  با موفقیت انجام شد','header'=>'ثبت کمیسیون جدید','alerts'=>'success']);

        }
    }

    public function edit($id)
    {
        $commission=Commission::findOrFail($id);
        $category=CategoriesModel::get_parent2();
        $brand=[''=>'انتخاب برند']+BrandsModel::pluck('brand_name','id')->toArray();
        return view('admin.commission.edit',['category'=>$category,'brand'=>$brand,'commission'=>$commission]);
    }

    public function update($id,Request $request)
    {
        $commission=Commission::findOrFail($id);
        $this->validate($request,[
            'cat_id'=>'required',
            'brand_id'=>'required',
            'percentage'=>'required|numeric'
        ],[],['cat_id'=>'گروه محصولات','brand_id'=>'برند','percentage'=>'درصد کمیسیون']);

        $cat_id=$request->get('cat_id');
        $brand_id=$request->get('brand_id');
        $row=Commission::where(['cat_id'=>$cat_id,'brand_id'=>$brand_id])->first();

        if ($row && $row->id!=$id)
        {
            return redirect()->back()->withInput()->with(['message'=>'برای دسته و برند انتخاب شده قبلاً درصد کمیسیون ثبت شده','header'=>'هشدار','alerts'=>'warning']);
        }
        else{
            $commission->update($request->all());
            return redirect('admin/commissions')
                ->with(['message'=>'ویرایش کمیسیون با موفقیت انجام شد','header'=>'ویرایش کمیسیون','alerts'=>'info']);

        }
    }
}
