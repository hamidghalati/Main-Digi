<?php

namespace App\Http\Controllers\Admin;

use App\CategoriesModel;
use App\DiscountCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\DiscountRequest;
use Illuminate\Http\Request;

class DiscountController extends CustomController
{
    protected $model='DiscountCode';
    protected $title='تخفیف';
    protected $route_params='discount';

    public function index(Request $request)
    {
        $discount=DiscountCode::getData($request->all());
        $trash_count=DiscountCode::onlyTrashed()->count();
        return view('admin.discount.index',['discount'=>$discount,'trash_count'=>$trash_count,'req'=>$request]);
    }

    public function create(){
        $cat=CategoriesModel::get_parent();
        return view('admin.discount.create',['cat'=>$cat]);
    }

    public function store(DiscountRequest $request)
    {
        $incredible_offers=$request->has('incredible_offers')? 1 :0;
        $date=getTimestamp($request->get('expire_time'),'last');
        $discount=new DiscountCode($request->all());
        $discount->expire_time=$date;
        $discount->incredible_offers=$incredible_offers;
        $discount->saveOrFail();
        return redirect('admin/discount')->with(['message'=>'ثبت کد تخفیف با موفقیت انجام شد','header'=>'ثبت کد تخفیف','alerts'=>'success']);
    }

    public function edit($id)
    {
        $discount=DiscountCode::findOrFail($id);
        $cat=CategoriesModel::get_parent();
        return view('admin/discount.edit',['discount'=>$discount,'cat'=>$cat]);
    }

    public function update($id,DiscountRequest $request)
    {
        $discount=DiscountCode::findOrFail($id);
        $incredible_offers=$request->has('incredible_offers')? 1 :0;
        $date=getTimestamp($request->get('expire_time'),'last');
        $formData=$request->all();
        $formData['expire_time']=$date;
        $formData['incredible_offers']=$incredible_offers;
        $discount->update($formData);
        return redirect('admin/discount')
            ->with(['message'=>'ویرایش کد تخفیف با موفقیت انجام شد','header'=>'ویرایش کد تخفیف','alerts'=>'info']);


    }






}
