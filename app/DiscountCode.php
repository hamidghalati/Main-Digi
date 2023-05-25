<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Session;

class DiscountCode extends Model
{
    use SoftDeletes;

    protected $table = 'discount_codes';
    protected $fillable = ['code', 'expire_time', 'cat_id', 'amount', 'number_usable', 'incredible_offers', 'amount_discount', 'amount_percent'];

    public static function getData($request)
    {
        $string = '?';
        $discount = self::orderBy('id', 'DESc');
        if (inTrashed($request)) {
            $discount = $discount->onlyTrashed();
            $string = create_paginate_url($string, 'trashed=true');
        }

        if (array_key_exists('string', $request) && !empty($request['string'])) {
            $discount = $discount->where('code', 'like', '%' . $request['string'] . '%');
            $string = create_paginate_url($string, 'string=' . $request['string']);
        }

        $discount = $discount->paginate(10);
        $discount->withPath($string);
        return $discount;
    }

    public static function check($discounts)
    {

        $discount_info=array();
        $cart_data = Cart::getCartData();
        $discount_value_array = array();
        $product_price2 = self::get_final_cart_price();

        foreach ($discounts as $discount) {
            $cat_id = $discount->cat_id;
            $price = 0;
            if ($cat_id > 0) {
                foreach ($cart_data['product'] as $product) {
                    if ($cat_id == $product['cat_id']) {
//                        $price += $product['price1'] * $product['product_count'];
                        $price += $product['int_price'] * $product['product_count'];
                    }
                }


                $result = self::set_discount_value($discount, $price, $cat_id);
                if (is_array($result) && $result['status'] == 'ok') {
                    $product_price2 = $product_price2 - $price;
                    if (array_key_exists($cat_id, $discount_value_array)) {
                        if ($result['discount_value'] > $discount_value_array[$cat_id]) {
                            $discount_value_array[$cat_id] = $result['discount_value'];
                            $discount_info[$cat_id] =[
                                'price'=>$result['price'],
                                'discount_amount'=>$result['discount_amount'],
                                'amount_percent'=>$result['amount_percent']
                            ];
                        }
                    } else {
                        $discount_value_array[$cat_id] = $result['discount_value'];
                        $discount_info[$cat_id] =[
                            'price'=>$result['price'],
                            'discount_amount'=>$result['discount_amount'],
                            'amount_percent'=>$result['amount_percent']
                        ];
                    }
                }

            }
        }

        foreach ($discounts as $discount) {

            $cat_id = $discount->cat_id;
            if ($cat_id == 0) {
                $result = self::set_discount_value($discount, $product_price2, $cat_id);
                if (is_array($result) && $result['status'] == 'ok') {
                    if (array_key_exists($cat_id, $discount_value_array)) {
                        if ($result['discount_value'] > $discount_value_array[$cat_id]) {
                            $discount_value_array[$cat_id] = $result['discount_value'];
                            $discount_info[$cat_id] =[
                                'price'=>$result['price'],
                                'discount_amount'=>$result['discount_amount'],
                                'amount_percent'=>$result['amount_percent']
                            ];
                        }
                    } else {
                        $discount_value_array[$cat_id] = $result['discount_value'];
                        $discount_info[$cat_id] =[
                            'price'=>$result['price'],
                            'discount_amount'=>$result['discount_amount'],
                            'amount_percent'=>$result['amount_percent']
                        ];
                    }
                }
            }
        }


        $cart_final_price = self::get_final_cart_price();
        $discount_value = 0;
        foreach ($discount_value_array as $key => $value) {
            $discount_value += $value;
        }
        if ($discount_value > 0) {
            $cart_final_price = $cart_final_price - $discount_value;

            if (Session::get('gift_value', 0) > 0) {
                $cart_final_price -= Session::get('gift_value', 0);
            }
            if (Session::get('discount_value', 0) > 0) {
                $cart_final_price -= Session::get('discount_value', 0);
            }

            Session::put('discount_info', $discount_info);
            Session::put('discount_value_array', $discount_value_array);
            Session::put('discount_value', $discount_value);
            Session::put('discount_code', $discount->code);
            return [
                'status' => 'ok',
                'discount_value' => replace_number(number_format($discount_value)) . ' تومان ',
                'cart_final_price' => replace_number(number_format($cart_final_price)) . ' تومان ',

            ];
        } else {
            return 'امکان استفاده از این کد تخفیف برای محصولات موجود در سبد خرید شما وجود ندارد.';
        }


    }

    public static function set_discount_value($discount, $price, $cat_id)
    {
        if ($price > 0) {
            $percent='';
            if ($price >= $discount->amount) {
                $discount_value = 0;
                if (!empty($discount->amount_discount)) {
                    $discount_value = $discount->amount_discount;

                } else if (!empty($discount->amount_percent)) {
                    $percent=$discount->amount_percent;
                    $discount_value = ($discount->amount_percent * $price) / 100;
                }
                return [
                    'status' => 'ok',
                    'discount_value' => $discount_value,
                    'price'=>$price,
                    'discount_amount'=>$discount->amount,
                    'amount_percent'=>$percent
                ];
            } else {
                return 'error';

            }
        } else {
            return 'error';

        }
    }

    public static function get_final_cart_price()
    {
        $cart_final_price = Session::get('cart_final_price', 0);

        if (Session::get('discount_value', 0) > 0) {
            $cart_final_price += Session::get('discount_value', 0);
        }

        if (Session::get('gift_value', 0) > 0) {
            $cart_final_price += Session::get('gift_value', 0);
        }
        return $cart_final_price;
    }


}
