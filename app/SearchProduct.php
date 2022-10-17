<?php

namespace App;

class SearchProduct
{
    protected $category=array();
    protected $min_price=0;
    protected $max_price=0;
    protected $attribute;

    public function __construct($request)
    {
        $this->setMinAndMaxPrice($request->all());
        $this->attribute=$request->get('attribute',null);
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

        $product=ProductsModel::with(['getProductColor.getColor','getFirstProductPrice'])
            ->select('id','title','product_url','price','discount_price','special','image_url','brand_id','status');
        if (is_array($this->category) && sizeof($this->category)>0)
        {
            $product=$product->whereIn('cat_id',$this->category);
        }

        $max_price=$product->orderBy('price','Desc')->first();

        if (is_array($this->attribute))
        {
            $product_id=$this->get_product_form_attribute();
            $product=$product->whereIn('id',$product_id);
        }

        if ($this->max_price!=0)
        {
            $product=$product->where('price','<=',$this->max_price);
        }
        if ($this->min_price>0)
        {
            $product=$product->where('price','>=',$this->min_price);
        }


        $product=$product->paginate(12);

        $max_price=$max_price ? $max_price->price : 0;



        return [
          'product'=>$product,
            'max_price'=>$max_price
        ];
    }

    public function setMinAndMaxPrice($data)
    {
        if (array_key_exists('price',$data))
        {
            if (array_key_exists('min',$data['price']))
            {
                $this->min_price=$data['price']['min'];
            }
            if (array_key_exists('max',$data['price']))
            {
                $this->max_price=$data['price']['max'];
            }
        }
    }

    public function get_product_form_attribute()
    {
        $array_id=array();
        foreach ($this->attribute as $key=>$value)
        {
            $data=ProductFilterModel::whereIn('filter_value',$value)->pluck('product_id','id')->toArray();
            $array_id[$key]=$data;

        }

        if (sizeof($array_id)>1)
        {
            $products_id=call_user_func_array('array_intersect',$array_id);
        }
        else
        {
            $id=collect($array_id);
            $products_id=$id->values()->all()[0];
        }
        return $products_id;
    }

}
