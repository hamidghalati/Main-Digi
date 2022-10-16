<?php

namespace App;

class SearchProduct
{
    protected $category=array();

    public function __construct($request)
    {
    }
    public function set_product_category($catList)
    {
        $this->category[$catList->id]=$catList->id;
        foreach ($catList->getChild as $key=>$value)
        {
            $this->category[$value->id]=$value->id;
        }
    }

    public function getProduct()
    {
        $max_price=0;
        $product=ProductsModel::with(['getProductColor.getColor','getFirstProductPrice'])
            ->select('id','title','product_url','price','discount_price','special','image_url','brand_id','status');
        if (is_array($this->category) && sizeof($this->category)>0)
        {
            $product=$product->whereIn('cat_id',$this->category);
        }
        $max_price=$product->orderBy('price','Desc')->first();
        $product=$product->paginate(12);

        $max_price=$max_price ? $max_price->price : 0;



        return [
          'product'=>$product,
            'max_price'=>$max_price
        ];
    }

}
