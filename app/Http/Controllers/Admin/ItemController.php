<?php

namespace App\Http\Controllers\Admin;

use App\CategoriesModel;
use App\Http\Controllers\Controller;
use App\ItemModel;
use Illuminate\Http\Request;

class ItemController extends Controller
{

    public function items($id)
    {
        $category=CategoriesModel::findOrFail($id);
        $items=ItemModel::with('getChild')->where(['category_id'=>$id,'parent_id'=>0])->orderby('position','asc')->get();
        return view('admin.item.index',['category'=>$category,'items'=>$items]);
    }

    public function add_items($cat_id,Request $request)
    {
      $items=$request->get('item',array());
      $child_item=$request->get('child_item',array());
      $checked_item=$request->get('check_box_item',array());
      ItemModel::addItem($items,$child_item,$checked_item,$cat_id);
     return redirect()->back()->with(['message'=>'ثبت مشخصات فنی  با موفقیت انجام شد','header'=>'مشخصات فنی ','alerts'=>'success']);

    }

    public function destroy($id)
    {
        $item=ItemModel::findOrFail($id);
        $item->getChild()->delete();
        $item->delete();
        return redirect()->back()->with(['message'=>'اطلاعات شما با موفقیت حذف شد','header'=>'حذف مشخصات فنی ','alerts'=>'error']);

    }

}
