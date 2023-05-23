<?php


namespace App;
class OrderData
{
    protected $OrderInfo;
    protected $ProductRow;
    protected $order_row_amount = array();
    protected $order_row_products = array();
    protected $array_product_id=array();
    protected $array_color_id=array();
    protected $array_warranty_id=array();
    protected $row_data=array();
    protected $user_id=0;
    protected $check_gift_cart='no';

    public function __construct($OrderInfo, $ProductRow,$user_id,$check_gift_cart='no')
    {
        $this->check_gift_cart=$check_gift_cart;
        $this->user_id=$user_id;
        $this->OrderInfo = $OrderInfo;
        $this->ProductRow = $ProductRow;
    }

    public function getData($id=0)
    {
        foreach ($this->OrderInfo as $info) {

            if (($id>0 && $info->id=$id)|| $id==0)
            {
                $this->order_row_amount[$info->id]=$info->send_order_amount;

                $products_id = explode('-', $info->product_id);
                $colors_id = explode('-', $info->colors_id);
                $warranty_id = explode('-', $info->warranty_id);
                foreach ($products_id as $key => $value) {
                    if (!empty($value)) {
                        $this->getProductDataOfList($info, $this->ProductRow, $value, $warranty_id[$key], $colors_id[$key]);
                    }
                }
            }
        }

        $this->getProductData();

        return [
            'order_row_amount'=>$this->order_row_amount,
            'row_data'=>$this->row_data,
        ];
    }

    function getProductDataOfList($info, $products, $products_id, $warranty_id, $colors_id)
    {

        foreach ($products as $key => $value) {
            if ($value->product_id == $products_id && $value->warranty_id == $warranty_id && $value->color_id == $colors_id) {
                $amount = $value->product_price2 * $value->product_count;
                $p = array_key_exists($info->id, $this->order_row_amount) ? $this->order_row_amount[$info->id] : 0;
                $this->order_row_amount[$info->id] = $p + $amount;

                $size=array_key_exists($info->id,$this->order_row_products)? sizeof($this->order_row_products[$info->id]) :0;
                $this->order_row_products[$info->id][$size]=$value;

                $this->array_product_id[$value->product_id]=$value->product_id;
                $this->array_color_id[$value->color_id]=$value->color_id;
                $this->array_warranty_id[$value->warranty_id]=$value->warranty_id;
            }
        }

    }

    public function getProductData()
    {
        $products=ProductsModel::whereIn('id',$this->array_product_id)
            ->select(['id','title','image_url','use_for_gift_cart'])->get();
        $colors=ColorModel::whereIn('id',$this->array_color_id)->get();
        $warranties=WarrantyModel::whereIn('id',$this->array_warranty_id)->get();
        $j=0;
        foreach ($this->order_row_products as $key=>$value)
        {
            foreach ($value as $key2=>$value2)
            {
                $product=getCartProductData($products,$value2->product_id);
                $color=getCartColorData($colors,$value2->color_id);
                $warranty=getCartWarrantyData($warranties,$value2->warranty_id);
                if ($product  && $warranty)
                {
                    if ($this->check_gift_cart=='yes')
                    {
                        CheckGiftCart($product,$this->user_id,$value2->product_price2,$this->OrderInfo[0]->order_id);

                    }
                    $this->row_data[$key][$j]['title']=$product->title;
                    $this->row_data[$key][$j]['image_url']=$product->image_url;
                    $this->row_data[$key][$j]['warranty_name']=$warranty->name;
                    $this->row_data[$key][$j]['seller']=$value2->getSeller->brand_name;
                    $this->row_data[$key][$j]['commission']=$value2->commission;
                    $this->row_data[$key][$j]['send_status']=$value2->send_status;
                    $this->row_data[$key][$j]['row_id']=$value2->id;
                    $this->row_data[$key][$j]['post']=$value2->product_price2;
                    if ($color)
                    {
                         $this->row_data[$key][$j]['color_name']=$color->name;
                         $this->row_data[$key][$j]['color_code']=$color->code;
                         $this->row_data[$key][$j]['color_id']=$color->id;
                    }
                    else
                    {
                         $this->row_data[$key][$j]['color_id']=0;
                    }
                    $this->row_data[$key][$j]['product_count']=$value2->product_count;
                    $this->row_data[$key][$j]['product_price1']=$value2->product_price1;
                    $this->row_data[$key][$j]['product_price2']=$value2->product_price2;
                    $j++;


                }
            }
        }
    }


}
