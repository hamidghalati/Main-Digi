<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class InventoryList extends Model
{
    protected $fillable = ['product_count', 'product_warranty_id', 'stockroom_id'];

    public static function getList($id, $request,$page_size=10)
    {
        $string='?';
        $title=$request->get('title','');
        $seller_id=$request->get('seller_id','');
        define('search_text',$title);
        define('seller_id',$seller_id);

        $inventory_list = self::where(['stockroom_id' => $id])
            ->orderBy('id', 'DESC')
            ->where('product_count','>',0)
            ->with(['getProductWarranty' => function ($query) {
                $query->with(['getColor', 'getSeller', 'getWarranty', 'getProduct']);
            }])
            ->whereHas('getProductWarranty',function (Builder $query){
                if (!empty(search_text))
                {
                    $query->whereHas('getProduct',function (Builder $query2){
                        $query2->where('title','like','%'.search_text.'%');
                    });
                }
                else{
                    $query->whereHas('getProduct');
                }

                if (!empty(seller_id)|| seller_id=="0")
                {
                    $query->where('seller_id',seller_id);
                }


            });

        if (!empty(search_text))
        {
            $string=create_paginate_url($string,'title='.$request['title']);
        }

        if (!empty(seller_id)|| $seller_id=="0")
        {
            $string=create_paginate_url($string,'seller_id='.$request['seller_id']);
        }

        $inventory_list = $inventory_list->paginate($page_size);
        $inventory_list->withPath($string);

        return $inventory_list;

    }

    public function getProductWarranty()
    {
        return $this->hasOne(ProductWarranty::class,'id','product_warranty_id')->withTrashed();
    }
}
