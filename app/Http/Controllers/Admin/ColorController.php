<?php

namespace App\Http\Controllers\Admin;

use App\ColorModel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ColorController extends CustomController
{


    protected $model='ColorModel';
    protected $title='زنگ';
    protected $route_params='colors';

    public function index(Request $request)
    {
        $color=ColorModel::getData($request->all());
        $trash_count=ColorModel::onlyTrashed()->count();
        return view('admin.color.index',['color'=>$color,'trash_count'=>$trash_count,'req'=>$request]);

    }

    public function create()
    {
        return view('admin.color.create');
    }

    public function store(Request $request)
    {
        $this->validate($request,['name'=>'required','code'=>'required'],[],['name'=>'نام رنگ','code'=>'کد رنگ']);
        $color=new ColorModel($request->all());
        $color->saveOrFail();
        return redirect('admin/colors')->with(['message'=>'ثبت رنگ با موفقیت انجام شد','header'=>'ثبت رنگ','alerts'=>'success']);
    }

    public function edit($id)
    {
        $color=ColorModel::findOrFail($id);
        return view('admin.color.edit',['color'=>$color]);
    }

    public function update($id,Request $request)
    {
        $this->validate($request,['name'=>'required','code'=>'required'],[],['name'=>'نام رنگ','code'=>'کد رنگ']);
        $color=ColorModel::findOrFail($id);
        $color->update($request->all());
        return redirect('admin/colors')
            ->with(['message'=>'ویرایش رنگ با موفقیت انجام شد','header'=>'ویرایش رنگ','alerts'=>'info']);

    }


}
