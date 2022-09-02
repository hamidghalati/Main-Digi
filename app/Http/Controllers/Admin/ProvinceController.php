<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\ProvinceModel;
use Illuminate\Http\Request;

class ProvinceController extends CustomController
{
    protected $model='ProvinceModel';
    protected $title='استان';
    protected $route_params='province';

    public function index(Request $request)
    {
        $province=ProvinceModel::getData($request->all());
        $trash_count=ProvinceModel::onlyTrashed()->count();
        return view('admin.province.index',['province'=>$province,'trash_count'=>$trash_count,'req'=>$request]);
    }

    public function create()
    {
        return view('admin.province.create');
    }

    public function store(Request $request)
    {
        $this->validate($request,['name'=>'required'],[],['name'=>'نام استان']);
        $province=new ProvinceModel($request->all());
        $province->saveOrFail();
        return redirect('admin/province')->with(['message'=>'ثبت نام استان  با موفقیت انجام شد','header'=>'ثبت استان جدید','alerts'=>'success']);

    }

    public function edit($id)
    {
        $province=ProvinceModel::findOrFail($id);
        return view('admin.province.edit',['province'=>$province]);
    }

    public function update($id,Request $request)
    {
        $province=ProvinceModel::findOrFail($id);
        $this->validate($request,['name'=>'required'],[],['name'=>'نام استان']);
        $province->update($request->all());
        return redirect('admin/province')
            ->with(['message'=>'ویرایش استان با موفقیت انجام شد','header'=>'ویرایش استان','alerts'=>'info']);

    }
}
