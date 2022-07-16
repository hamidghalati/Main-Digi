<?php

use App\Lib\Jdf;
use App\ProductPriceModel;
use App\ProductWarranty;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;
use Hekmatinasser\Verta\Verta;
$v = new Verta();



function get_url($string)
{
    $url = str_replace('-', ' ', $string);
    $url = str_replace('/', ' ', $url);
    $url = preg_replace('/\s+/', '-', $url);
    return $url;
}

function uploade_file($request,$name,$directory,$pix='')
{
    if ($request->hasFile($name))
    {
        $file_name=$pix.time().'.'.$request->file($name)->getClientoriginalExtension();
        if ($request->file($name)->move('files/'.$directory,$file_name)){
            return $file_name;
        }
        else{
            return null;
        }
    }
    else
    {
        return null;
    }
}



function replace_number($number){
    $number=str_replace("0",'۰',$number);
    $number=str_replace("1",'۱',$number);
    $number=str_replace("2",'۲',$number);
    $number=str_replace("3",'۳',$number);
    $number=str_replace("4",'۴',$number);
    $number=str_replace("5",'۵',$number);
    $number=str_replace("6",'۶',$number);
    $number=str_replace("7",'۷',$number);
    $number=str_replace("8",'۸',$number);
    $number=str_replace("9",'۹',$number);
    return $number;
}

function inTrashed($req){
    if (array_key_exists('trashed',$req) && ['trashed']==true)
    {
        return true;
    }
    else{
        return false;
    }
}

function create_paginate_url($string,$text){
    if ($string=='?')
    {
        $string=$string.$text;
    }
    else{
        $string=$string.'&'.$text;
    }
    return $string;
}

function create_crud_route($route_param,$controller,$show=false)
{
    if ($show)
    {
        Route::resource($route_param,'Admin\\'.$controller);
    }
    else
    {
        Route::resource($route_param,'Admin\\'.$controller)->except(['show']);
    }
    Route::post($route_param.'/remove_item','Admin\\'.$controller.'@remove_item');
    Route::post($route_param.'/restore_item','Admin\\'.$controller.'@restore_item');
    Route::post($route_param.'/{category}','Admin\\'.$controller.'@restore');
}
function create_fit_pic($pic_url,$pic_name){
    $thumb=Image::make($pic_url);
    $thumb->resize(350,350);
    $thumb->save(('files/thumb/'.$pic_name));
}

function remove_file($file_name,$directory){
    if (!empty($file_name) && file_exists('files/'.$directory.'/'.$file_name))
    {
        unlink('files/'.$directory.'/'.$file_name);

    }

}

function add_min_product_price($warrenty)
{
    $v = verta();
    $year=$v->year;
    $month=$v->month;
    $day=$v->day;
    $has_row=DB::table('product_price')
        ->where(['Year'=>$year,'month'=>$month,'day'=>$day,
            'color_id'=>$warrenty->color_id,'product_id'=>$warrenty->product_id])->first();
    if($has_row)
    {
        if($warrenty->price2 < $has_row->price || $has_row->price==0)
        {
            DB::table('product_price')
                ->where(['Year'=>$year,'month'=>$month,'day'=>$day,
                    'color_id'=>$warrenty->color_id,'product_id'=>$warrenty->product_id])
                ->update([
                    'price'=>$warrenty->price2,
                    'warranty_id'=>$warrenty->id

                ]);

        }

    }
    else
    {
        DB::table('product_price')
            ->insert(
                ['Year'=>$year,
                    'month'=>$month,
                    'day'=>$day,
                    'color_id'=>$warrenty->color_id,
                    'product_id'=>$warrenty->product_id,
                    'price'=>$warrenty->price2,
                    'time'=>time(),
                    'warranty_id'=>$warrenty->id

                ]
            );
    }
}

function update_product_price($product)
{
    $warrenty=ProductWarranty::where('product_id',$product->id)
    ->where('product_number','>',0)->orderBy('price2','asc')->first();
    if($warrenty)
    {
        $product->price=$warrenty->price2;
        $product->status=1;
        $product->update();
    }
    else
    {
        $product->status=0;
        $product->update();
    }
}


function check_has_product_warranty($warranty){
    $v = verta();
    $year=$v->year;
    $month=$v->month;
    $day=$v->day;
    $row=ProductWarranty::where(['product_id'=>$warranty->product_id,'color_id'=>$warranty->color_id])
        ->where('product_number','>',0)
        ->orderBy('price2','ASC')->first();
    $price=$row ? $row->price2 : 0;
    $warranty_id=$row ? $row->id : 0;
    $has_row=ProductPriceModel::
       where(['Year'=>$year,'month'=>$month,'day'=>$day,
            'color_id'=>$warranty->color_id,'product_id'=>$warranty->product_id])->first();
    if ($has_row)
    {
        $has_row->price=$price;
        $has_row->warranty_id=$warranty_id;
        $has_row->update();
    }
    else
    {
        DB::table('product_price')
            ->insert(
                ['Year'=>$year,
                    'month'=>$month,
                    'day'=>$day,
                    'color_id'=>$warranty->color_id,
                    'product_id'=>$warranty->product_id,
                    'price'=>$price,
                    'time'=>time(),
                    'warranty_id'=>$warranty_id

                ]
            );
    }
}

function is_selected_value($list,$filter_id)
{
    $result=false;
    foreach ($list as $key=>$value)
    {
        if ($value->filter_value==$filter_id)
        {
            $result=true;
        }
    }
    return $result;
}

function getFilterArray($list)
{
    $array=array();
    foreach ($list as $key=>$value)
    {
        $array[$value->item_id]=$key;
    }
    return $array;
}

function getFilterItemValue($filter_id,$product_filters)
{
    $string='';
    foreach ($product_filters as $key=>$value)
    {
        if ($value==$filter_id)
        {
            $string.='@'+$key;
        }
    }
    return $string;

}

function get_show_category_count($catList)
{
    $n=0;
    foreach ($catList as $key=>$value)
    {
        if ($value->notShow==0)
        {
            $n++;
        }
    }
    return $n;
}

