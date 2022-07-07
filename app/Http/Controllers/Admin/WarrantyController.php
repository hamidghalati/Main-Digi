<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\WarrantyModel;
use Illuminate\Http\Request;

class WarrantyController extends CustomController
{
    protected $model='WarrantyModel';
    protected $title='گارانتی محصول';
    protected $route_params='warranties';

    public function index(Request $request)
    {
        $warranty=WarrantyModel::getData($request->all());
        $trash_count=WarrantyModel::onlyTrashed()->count();
        return view('admin.warranty.index',['warranty'=>$warranty,'trash_count'=>$trash_count,'req'=>$request]);

    }

    public function create()
    {
        return view('admin.warranty.create');
    }

    public function store(Request $request)
    {
        $this->validate($request,['name'=>'required'],[],['name'=>'نام گارانتی']);
        $warranty=new WarrantyModel($request->all());
        $warranty->saveOrFail();
        return redirect('admin/warranties')->with(['message'=>'ثبت گارانتی با موفقیت انجام شد','header'=>'ثبت گارانتی','alerts'=>'success']);
    }

    public function edit($id)
    {
        $warranty=WarrantyModel::findOrFail($id);
        return view('admin.warranty.edit',['warranty'=>$warranty]);
    }

    public function update($id,Request $request)
    {
        $this->validate($request,['name'=>'required'],[],['name'=>'نام گارانتی']);
        $warranty=WarrantyModel::findOrFail($id);
        $warranty->update($request->all());
        return redirect('admin/warranties')
            ->with(['message'=>'ویرایش گارانتی با موفقیت انجام شد','header'=>'ویرایش گارانتی','alerts'=>'info']);

    }
}
