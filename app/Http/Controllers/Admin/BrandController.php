<?php

namespace App\Http\Controllers\Admin;

use App\BrandsModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\BrandRequest;
use Illuminate\Http\Request;

class BrandController extends CustomController
{
    protected $model='BrandsModel';
    protected $title='برند';
    protected $route_params='brands';

    public function index(Request $request)
    {
        $brand=BrandsModel::getData($request->all());
        $trash_count=BrandsModel::onlyTrashed()->count();
        return view('admin.brand.index',['brand'=>$brand,'trash_count'=>$trash_count,'req'=>$request]);

    }

    public function create()
    {
        return view('admin.brand.create');
    }

    public function store(BrandRequest $request)
    {
        $brand=new BrandsModel($request->all());
        $img_url=uploade_file($request,'pic','upload');
        $brand->brand_icon=$img_url;
        $brand->saveOrFail();
        return redirect('admin/brands')->with(['message'=>'ثبت برند با موفقیت انجام شد','header'=>'ثبت برند','alerts'=>'success']);
    }

    public function edit($id)
    {
        $brand=BrandsModel::findOrFail($id);
        return view('admin.brand.edit',['brand'=>$brand]);
    }

    public function update($id,BrandRequest $request)
    {
        $brand=BrandsModel::findOrFail($id);
        $img_url=uploade_file($request,'pic','upload');
        if ($img_url!=null){
            $brand->brand_icon=$img_url;
        }
        $brand->update($request->all());
        return redirect('admin/brands')
            ->with(['message'=>'ویرایش برند با موفقیت انجام شد','header'=>'ویرایش برند','alerts'=>'info']);

    }
}
