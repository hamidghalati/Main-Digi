<?php

namespace App\Http\Controllers\Admin;

use App\CategoriesModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoriesRequest;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\SoftDeletes;


class CategoryController extends CustomController
{
    protected $model='CategoriesModel';
    protected $title='گروه محصولات';
    protected $route_params='category';

    public function index(Request $request)
    {
        $category=CategoriesModel::getData($request->all());
        $trash_count=CategoriesModel::onlyTrashed()->count();
        return view('admin.category.index',['category'=>$category,'trash_count'=>$trash_count,'req'=>$request]);
    }
    public function create()
    {
        $parent_cat= (new CategoriesModel)->get_parent();
        return view('admin.category.create',['parent_cat'=>$parent_cat]);
    }
    public function store(CategoriesRequest $request)
    {
        $notShow=$request->has('notShow')?1:0;
        $Categories=new CategoriesModel($request->all());
        $Categories->notShow=$notShow;
        $Categories->url=get_url($request->get('ename'));
        $img_url=uploade_file($request,'pic','upload');
        $Categories->img=$img_url;
        $Categories->save();
        cache()->forget('catList');
        return redirect('admin/category')->with(['message'=>'ثبت گروه محصولات با موفقیت انجام شد','header'=>'ثبت گروه محصولات','alerts'=>'success']);
    }


    public function edit($id)
    {
        $category=CategoriesModel::findOrFail($id);
        $parent_cat= (new \App\CategoriesModel)->get_parent();
        return view('admin.category.edit',['category'=>$category,'parent_cat'=>$parent_cat]);
    }

    public function update(Request $request, $id)
    {
        cache()->forget('catList');
        $data=$request->all();
        $category=CategoriesModel::findOrFail($id);
        $notShow=$request->has('notShow')?1:0;
        $category->url=get_url($request->get('ename'));
        $img_url=uploade_file($request,'pic','upload');
        if ($img_url!=null){
            $category->img=$img_url;
        }
        $data['notShow']=$notShow;
        $category->update($data);
        return redirect('admin/category')
            ->with(['message'=>'ویرایش گروه محصولات با موفقیت انجام شد','header'=>'ویرایش گروه محصولات','alerts'=>'info']);


    }


}
