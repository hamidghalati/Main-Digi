<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockroomProduct extends Model
{
    protected $fillable=['event_id','product_warranty_id','product_count','stockroom_id'];

    public function getProductWarranty()
    {
        return $this->hasOne(ProductWarranty::class,'id','product_warranty_id')->withTrashed();
    }
}
