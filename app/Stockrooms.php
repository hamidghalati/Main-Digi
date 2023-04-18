<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Stockrooms extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'address'];
    protected $table = 'stockrooms';

    public static function getData($request)
    {
        $string = '?';
        $stockroom = self::orderBy('id', 'DESc');
        if (inTrashed($request)) {
            $stockroom = $stockroom->onlyTrashed();
            $string = create_paginate_url($string, 'trashed=true');
        }

        if (array_key_exists('string', $request) && !empty($request['string'])) {
            $stockroom = $stockroom->where('name', 'like', '%' . $request['string'] . '%');
            $string = create_paginate_url($string, 'string=' . $request['string']);
        }

        $stockroom = $stockroom->paginate(10);
        $stockroom->withPath($string);
        return $stockroom;

    }

    public static function add_product($request)
    {
        DB::beginTransaction();

        try {
            $user_id = $request->user()->id;
            $stockroom_id = $request->get('stockroom_id', 0);
            $list = $request->get('list');
            $time = time();
            $list = explode('@', $list);
            $type = $request->get('type', 'input');
            $product_count = get_stockroom_product_count($list);
            $stockroomEvent = new StockroomEvent($request->all());
            $stockroomEvent->user_id = $user_id;
            $stockroomEvent->time = $time;
            $stockroomEvent->type = $type;
            $stockroomEvent->product_count = $product_count;
            $stockroomEvent->save();

            foreach ($list as $key => $value) {
                $e = explode('_', $value);
                if (sizeof($e) == 2) {
                    $stockroomProduct = new StockroomProduct();
                    $stockroomProduct->product_warranty_id = $e[0];
                    $stockroomProduct->product_count = $e[1];
                    $stockroomProduct->event_id = $stockroomEvent->id;
                    $stockroomProduct->stockroom_id = $stockroom_id;
                    $stockroomProduct->save();


                    self::setInventory($type, $e[0], $e[1], $stockroom_id);

                }
            }

            DB::commit();
            return 'ok';
        } catch (\Exception $exception) {
            DB::rollBack();
            return 'error';

        }


    }

    public static function setInventory($type, $product_warranty_id, $product_count, $stockroom_id)
    {
        if ($type == 'input') {
            $check = InventoryList::where(['product_warranty_id' => $product_warranty_id, 'stockroom_id' => $stockroom_id])->first();
            if ($check) {
                $check->product_count += $product_count;
                $check->update();
            } else {
                $inventoryList = new InventoryList();
                $inventoryList->product_warranty_id = $product_warranty_id;
                $inventoryList->product_count = $product_count;
                $inventoryList->stockroom_id = $stockroom_id;
                $inventoryList->save();

            }
        } else {
            $check = InventoryList::where(['product_warranty_id' => $product_warranty_id, 'stockroom_id' => $stockroom_id])->first();
                $check->product_count -= $product_count;
                $check->update();


        }
    }

    public static function getProductList($id,$type,$request)
    {
        $string=$request->get('string','');
        define('search_text',$string);
        $stockroomEvent=StockroomEvent::with(['getUser','getStockroom'])
            ->where(['type'=>$type])
            ->where('id',$id)
            ->firstOrFail();

        $stockroom_product=StockroomProduct::with(['getProductWarranty'=>function($query){
           $query->with(['getColor','getSeller','getWarranty','getProduct']);
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
            })
            ->where('event_id',$id)->get();

        return[
            'stockroomEvent'=>$stockroomEvent,
            'stockroom_product'=>$stockroom_product
        ];


    }


}
