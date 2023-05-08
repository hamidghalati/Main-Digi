<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\InventoryList;
use App\ProductWarranty;
use App\Seller;
use App\StockroomEvent;
use App\Stockrooms;
//use Illuminate\Database\Query\Builder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class StockroomController extends CustomController
{
    protected $model='Stockrooms';
    protected $title='انبار';
    protected $route_params='stockrooms';

    public function index(Request $request)
    {
        $stockroom=Stockrooms::getData($request->all());
        $trash_count=Stockrooms::onlyTrashed()->count();
        return view('admin.stockroom.index',['stockroom'=>$stockroom,'trash_count'=>$trash_count,'req'=>$request]);

    }

    public function create (){
        return view('admin.stockroom.create');
    }

    public function store(Request $request)
    {
        $this->validate($request,['name'=>'required|unique:Stockrooms'],[],['name'=>'نام انبار']);
        $stockroom=new Stockrooms($request->all());
        $stockroom->saveOrFail();
        return redirect('admin/stockrooms')->with(['message'=>'ثبت انبار با موفقیت انجام شد','header'=>'ثبت انبار','alerts'=>'success']);
    }

    public function edit($id)
    {
        $stockroom=Stockrooms::findOrFail($id);
        return view('admin.stockroom.edit',['stockroom'=>$stockroom]);
    }

    public function update($id,Request $request)
    {
        $this->validate($request,['name'=>'required|unique:Stockrooms,name,'.$id.''],[],['name'=>'نام انبار']);
        $stockroom=Stockrooms::findOrFail($id);
        $stockroom->update($request->all());
        return redirect('admin/stockrooms')
            ->with(['message'=>'ویرایش انبار با موفقیت انجام شد','header'=>'ویرایش انبار','alerts'=>'info']);

    }

    public function add_input()
    {
        $stockroom=Stockrooms::get();
        return view('admin.stockroom.add_input',['stockroom'=>$stockroom]);
    }

    public function getProductWarranty(Request $request)
    {
        $search_text=$request->get('search_text','');
        $product_warranty=ProductWarranty::
        with(['getProduct','getWarranty','getSeller','getColor']);

        if (!empty($search_text))
        {
            define('title',$search_text);
            $product_warranty=$product_warranty->whereHas('getProduct',function (Builder $query){
                $query->where('title','like','%'.title.'%');
            });
        }
        else{
            $product_warranty=$product_warranty->whereHas('getProduct');
        }
            $product_warranty=$product_warranty
            ->paginate(5);
        return $product_warranty;
    }

    public function add_product(Request $request)
    {
        return Stockrooms::add_product($request);
    }

    public function input(Request $request)
    {

       $stockroom=[''=>'انتخاب انبار']+Stockrooms::pluck('name','id')->toArray();
        $stockroomEvent=StockroomEvent::getList($request,'input');
       return view('admin.stockroom.input',['stockroomEvent'=>$stockroomEvent,'stockroom'=>$stockroom,'req'=>$request]);
    }

    public function show_input($id,Request $request)
    {
        $input=Stockrooms::getProductList($id,"input",$request);
        return view('admin.stockroom.show_input',['input'=>$input,'req'=>$request]);
    }

    public function show($id,Request $request)
    {
        $stockroom=Stockrooms::findOrFail($id);
        $inventory_list=InventoryList::getList($id,$request);

        $seller=[''=>'انتخاب فروشنده',0=>env('SHOP_NAME')]+Seller::pluck('brand_name','id')->toArray();

        return view('admin.stockroom.list',['stockroom'=>$stockroom,'req'=>$request,'inventory_list'=>$inventory_list,'seller'=>$seller]);
    }

    public function add_output()
    {
        $stockroom=Stockrooms::get();
        return view('admin.stockroom.add_output',['stockroom'=>$stockroom]);
    }

    public function getInventory(Request $request)
    {
        $stockroom_id=$request->get('stockroom_id',0);
        return InventoryList::getList($stockroom_id,$request,10);
    }

    public function output (Request $request)
    {
        $stockroom=[''=>'انتخاب انبار']+Stockrooms::pluck('name','id')->toArray();

        $stockroomEvent=StockroomEvent::getList($request,'output');

        return view('admin.stockroom.output',['stockroomEvent'=>$stockroomEvent,'stockroom'=>$stockroom,'req'=>$request]);
    }

    public function show_output($id,Request $request)
    {
        $output=Stockrooms::getProductList($id,"output",$request);
        return view('admin.stockroom.show_output',['output'=>$output,'req'=>$request]);
    }

    public function input_factor($id,Request $request)
    {
        $input=Stockrooms::getProductList($id,"input",$request);
        $type="input";
        return view('admin.stockroom.factor',['input'=>$input,'type'=>$type]);
    }

}
