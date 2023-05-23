<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>فاکتور</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @yield('header')
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">

    <style>
        body {
            background-color: white !important;
        }

    </style>
</head>
<body>
<?php $jdf = new \App\Lib\jdf(); ?>
<div class="container factor">

    <div class="line"></div>
    <div class="header_factor">
        <div>
            <p>
                <span>تاریخ :{{$jdf->jdate('Y/m/d') }} - {{$jdf->jdate('H:i:s') }}</span>
                <span>شماره مرسوله : {{ $order->id }}</span>
                {{--                <span>تعداد محصول : {{ replace_number(sizeof($order_data['row_data'][$order->id])) }}</span>--}}
            </p>
        </div>
        <div class="title">
            فاکتور سفارش
        </div>
        <div>
            <img src="{{asset(env('SHOP_LOGO','files/images/logo.svg'))}}" alt="" class="shop_logo">
        </div>
    </div>

    <?php

    use Hekmatinasser\Verta\Verta;

    $v = new Verta();
    $orderStatus = \App\Order::orderStatus();


    $total_price = 0;
    $order_price = 0;
    $post_price = 0;
    $d = 0;
    $g = 0;
    $tp = 0;
    ?>

    <table class="table table-bordered order_table_info">
        <tr>
            <td>
                تحویل گیرنده:
                <span>{{$order->getAddress->name}}</span>
            </td>
            <td>
                شماره تماس تحویل گیرنده :
                <span>{{replace_number($order->getAddress->mobile)}}</span>
            </td>
        </tr>
        <tr>
            <td>
                آدرس تحویل گیرنده:
                <span>{{'استان '.$order->getAddress->getProvince->name.' -  شهر '.$order->getAddress->getCity->name.' - '.$order->getAddress->address}}</span>
            </td>
            <td>
                تعداد مرسوله :
                <span>{{replace_number(sizeof($order->getOrderInfo))}}</span>
            </td>
        </tr>


        @if(!empty($order->gift_value)&& $order->gift_value>0)
            <tr>
                <td>
                    مبلغ کارت هدیه :
                    <span
                        style="font-family: IRANSans">{{replace_number(number_format($order->gift_value)).' تومان '}}</span>
                </td>
                <td>
                    کد کارت هدیه :
                    <span
                        style="font-family: IRANSans">{{$order->getGiftCart->code}}</span>
                </td>
            </tr>

        @endif

        @if(!empty($order->discount_value)&& $order->discount_value>0)
            <tr>
                <td>
                    مبلغ کارت تخفیف :
                    <span style="font-family: IRANSans">
                        {{replace_number(number_format($order->discount_value)).' تومان '}}
                    </span>
                </td>
                <td>
                    کد کارت تخفیف :
                    <span
                        style="font-family: IRANSans">{{$order->discount_code}}</span>
                </td>
            </tr>

        @endif


    </table>

    <div style="padding: 20px"></div>

    @foreach($order->getOrderInfo as $key=>$value)

        <table class="table table-bordered order_table_info">
            <tr>
                <td>
                    کد مرسوله :
                    <span>{{replace_number($value['id'])}}</span>
                </td>
                <td>
                    زمان تحویل سفارش :
                    <span>{{$value['delivery_order_interval']}}</span>
                </td>
            </tr>

            <tr>
                <td>
                    نحوه ارسال :
                    <span>پست پیشتاز</span>
                </td>
                <td>
                    هزینه ارسال :
                    <span>
                            @if($value['send_order_amount']==0)
                            رایگان
                        @else
                                <?php $post_price += $value['send_order_amount'] ?>
                            {{replace_number(number_format($value['send_order_amount'])).' تومان '}}
                        @endif
                            </span>
                </td>
            </tr>

            <tr>
                <td colspan="2" style="text-align: center">
                    مبلغ این مرسوله :
                    <span style="font-family: IRANSans">{{replace_number(number_format($order_data['order_row_amount'][$value->id]))}} تومان </span>
                </td>
            </tr>

        </table>

        <table class="table product_list_data">
            <tr>
                <th>نام محصول</th>
                <th>تعداد</th>
                <th>قیمت واحد</th>
                <th>قیمت کل</th>
                <th>تخفیف</th>
                <th>قیمت نهایی</th>
            </tr>
            @foreach($order_data['row_data'][$value->id] as $product)
                <tr>
                    <td class="product_verify_info">
                        <div>
                            <img src="{{url('files/thumb/'.$product['image_url'])}}" alt="">
                            <ul>
                                <li class="title">{{$product['title']}}</li>
                                @if($product['color_id']>0)
                                    <li>
                                        <span>رنگ :</span>
                                        <span>{{$product['color_name']}}</span>
                                    </li>
                                @endif
                                <li>
                                    <span>گارانتی :</span>
                                    <span>{{$product['warranty_name']}}</span>
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td>{{replace_number($product['product_count'])}} </td>
                    <td>{{replace_number(number_format($product['product_price1']))}} تومان</td>
                    <td>
                            <?php $tp = $product['product_price1'] * $product['product_count'] ?>
                        {{replace_number(number_format($product['product_price1']*$product['product_count']))}}تومان
                    </td>
                        <?php
                        $discount = (($product['product_price1'] * $product['product_count']) - ($product['product_price2'] * $product['product_count']));
                        ?>
                    <td>
                        {{replace_number(number_format($discount))}}</td>
                    <td>
                            <?php $order_price += ($product['product_price2'] * $product['product_count']) ?>
                        {{replace_number(number_format($product['product_price2']*$product['product_count']))}}
                    </td>
                </tr>
            @endforeach

            <tr>
                <td colspan="3">کل :</td>
                <td>{{replace_number(number_format($tp))}} تومان</td>
                <td>
                    @if($discount==0)
                        {{replace_number(number_format($discount))}}
                    @else
                        {{replace_number(number_format($discount))}} تومان
                    @endif
                </td>
                <td>
                        <?php $sum = $tp - $discount ?>
                    {{replace_number(number_format($sum))}} تومان
                </td>
            </tr>
        </table>

    @endforeach

    <table class="table factor_price_table">
        <tr>
            <td>مبلغ کل</td>
            <td>{{replace_number(number_format($order_price)).' تومان '}}</td>
        </tr>
        <tr>
            <td> + هزینه ارسال</td>
            <td>
                @if($value['send_order_amount']==0)
                    رایگان
                @else
                        <?php $p = $post_price ?>
                    {{replace_number(number_format($post_price)).' تومان '}}
                @endif
            </td>
        </tr>
        @if(!empty($order->gift_value)&& $order->gift_value>0)
            <tr>
                <td>
                    - مبلغ کارت هدیه
                </td>
                <td>
                        <?php $g = $order->gift_value ?>
                    {{replace_number(number_format($order->gift_value)).' تومان '}}
                </td>
            </tr>

        @endif

        @if(!empty($order->discount_value)&& $order->discount_value>0)
            <tr>

                <td>- مبلغ کارت تخفیف</td>
                <td>
                        <?php $d = $order->discount_value ?>
                    {{replace_number(number_format($order->discount_value)).' تومان '}}
                </td>
            </tr>

        @endif

        <tr>
            <td>مبلغ نهایی</td>
            <td>
                <?php $total_price = ($order_price + $post_price) - ($g + $d) ?>
                @if($total_price==0)
                    {{replace_number(number_format($total_price))}}
                @else
                    {{replace_number(number_format($total_price)).' تومان '}}
                @endif
            </td>
        </tr>

    </table>
</div>

</body>
</html>
