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
        $product=ProductsModel::with(['getProductColor.getColor'])
            ->select('id','title','product_url','price','discount_price','special','image_url','brand_id','status');
        if (is_array($this->category) && sizeof($this->category)>0)
        {
            $product=$product->where('cat_id',$this->category);
        }
        $product=$product->paginate(12);
        return [
          'product'=>$product
        ];
    }

}
