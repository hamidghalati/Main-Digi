<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SliderRequest;
use App\SliderModel;
use Illuminate\Http\Request;

class SliderController extends CustomController
{
    protected $model='SliderModel';
    protected $title='اسلایدر';
    protected $route_params='sliders';

    public function index(Request $request)
    {
        $sliders=SliderModel::getData($request->all());
        $trash_count=SliderModel::onlyTrashed()->count();
        return view('admin.sliders.index',['sliders'=>$sliders,'trash_count'=>$trash_count,'req'=>$request]);

    }

    public function create()
    {
        return view('admin.sliders.create');
    }

    public function store(SliderRequest $request)
    {
        $slider=new SliderModel($request->all());
        $image_url=uploade_file($request,'pic','slider','desktop');
        $mobile_image_url=uploade_file($request,'mobile_pic','slider','mobile');
        $slider->image_url=$image_url;
        $slider->mobile_image_url=$mobile_image_url;
        $slider->saveOrFail();
        return redirect('admin/sliders')->with(['message'=>'اسلایدر با موفقیت ثبت شد','header'=>'ثبت اسلایدر','alerts'=>'success']);


    }

    public function edit($id){
        $sliders=SliderModel::findOrFail($id);
        return view('admin.sliders.edit',['sliders'=>$sliders]);
    }

    public function update($id,SliderRequest $request)
    {
        $slider=SliderModel::findOrFail($id);
        $image_url=uploade_file($request,'pic','slider','desktop');
        $mobile_image_url=uploade_file($request,'mobile_pic','slider','mobile');
        if ($image_url!=null)
        {
            $slider->image_url=$image_url;
        }
        if ($mobile_image_url!=null)
        {
            $slider->mobile_image_url=$mobile_image_url;
        }
        $slider->update($request->all());
        return redirect('admin/sliders')
            ->with(['message'=>'ویرایش اسلایدر با موفقیت انجام شد','header'=>'ویرایش اسلایدر','alerts'=>'info']);



    }





}
