<?php

namespace App\Http\Controllers\Admin;

use App\CityModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\CityRequest;
use App\ProvinceModel;
use Illuminate\Http\Request;

class CityController extends CustomController
{
    protected $model='CityModel';
    protected $title='شهر';
    protected $route_params='city';

    public function index(Request $request)
    {
        $city=CityModel::getData($request->all());
        $trash_count=CityModel::onlyTrashed()->count();
        return view('admin.city.index',['city'=>$city,'trash_count'=>$trash_count,'req'=>$request]);
    }

    public function create()
    {
        $province=ProvinceModel::get()->pluck('name','id')->toArray();
        return view('admin.city.create',['province'=>$province]);
    }

    public function store(CityRequest $request)
    {
        $city=new CityModel($request->all());
        $city->saveOrFail();
        return redirect('admin/city')->with(['message'=>'ثبت  شهر  با موفقیت انجام شد','header'=>'ثبت شهر جدید','alerts'=>'success']);

    }

    public function edit($id)
    {
        $province=ProvinceModel::get()->pluck('name','id')->toArray();
        $city=CityModel::findOrFail($id);
        return view('admin.city.edit',['province'=>$province,'city'=>$city]);
    }

    public function update($id,CityRequest $request)
    {
        $city=CityModel::findOrFail($id);
        $city->update($request->all());
        return redirect('admin/city')
            ->with(['message'=>'ویرایش شهر با موفقیت انجام شد','header'=>'ویرایش شهر','alerts'=>'info']);

    }
}
