<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ProductsModel extends Model
{
    use SoftDeletes;
    protected $table='products';
    protected $fillable=['id','title','ename','product_url','show','view','keywords','description',
        'special','cat_id','brand_id','image_url','tozihat','status','price','discount_price',
        'order_number','use_for_gift_cart','ready_to_shipment'];

    public static function ProductStatus(){
        $array=array();
        $array[-3]='رد شده';
        $array[-2]='در انتظار بررسی';
        $array[-1]='توقف تولید';
        $array[0]='ناموجود';
        $array[1]='منتشر شده';
        return $array;

    }

    public static function getData($request){
        $string='?';
        $products=self::orderBy('id','Desc');
        if (inTrashed($request)){
            $products=$products->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('string', $request) && !empty($request['string'])) {
            $products = $products->where('title', 'like', '%' . $request['string'] . '%');
            $string = create_paginate_url($string, 'string=' . $request['string']);
        }


        $products=$products->paginate(10);
        $products->withPath($string);
        return $products;


    }

    protected static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub
        static::deleting(function ($product){

                if ($product->isForceDeleting()){
                    remove_file($product->image_url,'products');
                    remove_file($product->image_url,'thumb');
                    DB::table('product_color')->where('product_id',$product->id)->delete();
                    DB::table('item_value')->where('product_id',$product->id)->delete();

                }

        });

    }

    public function getCat()
    {
        return $this->hasOne(CategoriesModel::class,'id','cat_id')->withDefault(['name'=>'']);
    }

    public function getBrand()
    {
        return $this->hasOne(BrandsModel::class,'id','brand_id')
            ->withDefault(['brand_name'=>'','brand_ename'=>'']);
    }

    public function getProductColor()
    {
        return $this->hasMany(ProductColorModel::class,'product_id','id');
    }

    public function getWarranty()
    {
        return $this->hasMany(ProductWarranty::class,'product_id','id')
            ->where('product_number','>',0)
            ->orderBy('price2','ASC');
    }

    public function getFirstProductPrice()
    {
        return $this->hasOne(ProductWarranty::class,'product_id','id')
            ->orderBy('price2','asc')
            ->select('id','product_id','price1','price2','offers_last_time','offers');
    }

    public function getItemValue()
    {
        return $this->hasMany(ItemValueModel::class,'product_id','id');
    }

    public function Gallery()
    {
        return $this->hasMany(ProductGalleryModel::class,'product_id','id')->orderBy('position','asc');
    }










}
