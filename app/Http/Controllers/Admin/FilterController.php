<?php

namespace App\Http\Controllers\Admin;

use App\CategoriesModel;
use App\FilterModel;
use App\Http\Controllers\Controller;
use App\ItemModel;
use Illuminate\Http\Request;

class FilterController extends Controller
{
    public function filters($id)
    {
        $category=CategoriesModel::findOrFail($id);
       $filters=FilterModel::with('getChild')->where(['category_id'=>$id,'parent_id'=>0])->orderby('position','asc')->get();
       $items=ItemModel::getCategoryItem($id);
        return view('admin.filter.index',['category'=>$category,'filters'=>$filters,'items'=>$items]);
    }
    public function add_filters($cat_id,Request $request)
    {

       $filter=$request->get('filter');
       $child_filter=$request->get('child_filter',array());
        $itemValue=$request->get('item_id');
       FilterModel::addFilter($filter,$child_filter,$cat_id,$itemValue);
        return redirect()->back()->with(['message'=>'ثبت فیلتر با موفقیت انجام شد','header'=>'فیلتر','alerts'=>'success']);
    }

    public function destroy($id)
    {
        $filter=FilterModel::findOrFail($id);
        $filter->getChild()->delete();
        $filter->delete();
        return redirect()->back()->with(['message'=>'اطلاعات شما با موفقیت حذف شد','header'=>'حذف فیلتر ','alerts'=>'error']);

    }
}
