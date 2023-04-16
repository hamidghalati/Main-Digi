<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InventoryList extends Model
{
    protected $fillable=['product_count','product_warranty_id','stockroom_id'];

    public static function getList($id,$request)
    {
        $inventory_list=self::where();
    }
}
