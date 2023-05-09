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
                <span>شماره مرسوله : {{ $submission_info->id }}</span>
                <span>تعداد محصول : {{ replace_number(sizeof($order_data['row_data'][$submission_info->id])) }}</span>
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
    $order = $submission_info->getOrder;
    $total_price = 0;
    $order_price = 0;
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
                شماره سفارش :
                <span>{{replace_number($submission_info->getOrder->order_id)}}</span>
            </td>
        </tr>


        <tr>
            <td>
                هزینه ارسال :
                <span>
                    @if($submission_info['send_order_amount']==0)
                        رایگان
                    @else
                        {{replace_number(number_format($submission_info['send_order_amount'])).' تومان '}}
                    @endif
                </span>
            </td>
            <td>
                نحوه ارسال :
                <span>پست پیشتاز</span>
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
        @foreach($order_data['row_data'][$submission_info->id] as $product)
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
                        <?php $total_price += ($product['product_price1'] * $product['product_count']) ?>
                    {{replace_number(number_format($product['product_price1']*$product['product_count']))}} تومان

                </td>
                    <?php
                    $discount = (($product['product_price1'] * $product['product_count']) - ($product['product_price2'] * $product['product_count']));
                    ?>
                <td>{{replace_number(number_format($discount))}}</td>
                <td>
                        <?php $order_price += ($product['product_price2'] * $product['product_count']) ?>
                    {{replace_number(number_format($product['product_price2']*$product['product_count']))}}
                </td>
            </tr>
        @endforeach

        <tr>
            <td colspan="3">کل</td>
            <td>{{replace_number(number_format($total_price))}} تومان</td>
            <td>{{replace_number(number_format($total_price-$order_price))}} تومان</td>
            <td>{{replace_number(number_format($order_price))}} تومان</td>
        </tr>
    </table>

    <table>
        <tr>
            <td>مبلغ کل</td>
            <td>{{replace_number(number_format($order_price))}} تومان</td>
        </tr>
        <tr>
            <td> هزینه ارسال</td>
            <td>
                @if($submission_info['send_order_amount']==0)
                    رایگان
                @else
                    {{replace_number(number_format($submission_info['send_order_amount'])).' تومان '}}
                @endif
            </td>
        </tr>
        <tr>

        </tr>
    </table>
</div>

</body>
</html>
