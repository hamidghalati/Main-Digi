<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            font-family: Tahoma;
        }

        .content {
            width: 100%;
            direction: rtl;
            text-align: right;
            font-family: Tahoma;
        }
        .content_box {
            width: 100%;
            margin: 20px auto;
        }
        .order_table_info {
            width: 95%;
            margin: 30px auto !important;
        }
        .table-bordered {
            border: 1px solid #dee2e6;
        }

        .order_table_info tr td {
            color: #bababa;
            width: 50%;
        }

        .table {
            width: 100%;
            margin-bottom: 1rem;
            color: #212529;
        }

        table {
            border-collapse: collapse;
        }

        .table-bordered th, .table-bordered td {
            border: 1px solid #dee2e6;
        }

        .table th, .table td {
            padding: 0.75rem;
            vertical-align: top;
            border-top: 1px solid #dee2e6;
        }

        .order_table_info tr td span {
            color: black !important;
            width: 100%;
            display: block;
            margin-top: 10px;
            font-family: Tahoma;
        }
        .product_list_data {
            width: 95%;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
            font-size: 13px;
            border: 1px solid #e7e7e7;

        }
        .product_list_data tr th {
            background-color: #85b3be;
            color: white;
            font-size: 14px;
            text-align: center;
            border-right-color: #85b3be;
        }
        .product_list_data .product_verify_info {
            width: 35%;
        }
        .product_list_data tr td {
            border-left: 1px solid #e7e7e7;
            text-align: center;
            vertical-align: center;
        }
        .product_list_data .product_verify_info div {
            display: flex;
        }
        .product_list_data tr td {
            text-align: center;
        }
        .product_list_data .product_verify_info div ul {
            font-size: 13px;
            color: #acacac !important;
            width: 100% ;
            text-align: right!important;
            display: inline-table;
        }
        .product_list_data .product_verify_info div ul li {
            list-style: none;
            text-align: justify;
        }
        .header{
            border-bottom: 1px solid #e7e7e7;
            width: 100%;
            padding-top: 40px;
            padding-bottom: 40px;
            text-align: center;
            font-size: 20px;
        }
    </style>
</head>
<body>
<div class="content">
    <div class="content_box">

        <div class="header">
            <h5>{{ env('SHOP_NAME') }}</h5>
        </div>

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
            <tr>
                <td>
                    مبلغ قابل پرداخت :
                    <span
                        style="font-family: Tahoma">{{replace_number(number_format($order->price))}} تومان </span>
                </td>
                <td>
                    مبلغ کل :
                    <span
                        style="font-family: Tahoma">{{replace_number(number_format($order->total_price))}}  تومان </span>
                </td>
            </tr>


            @if(!empty($order->gift_value)&& $order->gift_value>0)
                <tr>
                    <td>
                        مبلغ کارت هدیه :
                        <span
                            style="font-family: Tahoma">{{replace_number(number_format($order->gift_value))}} تومان </span>
                    </td>
                    <td>
                        کد کارت هدیه :
                        <span
                            style="font-family: Tahoma">{{$order->getGiftCart->code}}</span>
                    </td>
                </tr>

            @endif

            @if(!empty($order->discount_value)&& $order->discount_value>0)
                <tr>
                    <td>
                        مبلغ کارت تخفیف :
                        <span
                            style="font-family: Tahoma">{{replace_number(number_format($order->discount_value))}}تومان </span>
                    </td>
                    <td>
                        کد کارت تخفیف :
                        <span
                            style="font-family: Tahoma">{{$order->discount_code}}</span>
                    </td>
                </tr>

            @endif


        </table>

        <h4>محصولات</h4>

        <table class="table product_list_data">
            <tr>
                <th>نام محصول</th>
                <th>تعداد</th>
                <th>قیمت واحد</th>
                <th>قیمت کل</th>
                <th>تخفیف</th>
                <th>قیمت نهایی</th>
            </tr>
            @foreach($order->getOrderInfo as $key=>$value)
                @foreach($order_data['row_data'][$value->id] as $product)
                    <tr>
                        <td class="product_verify_info">
                            <div>
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
                        <td>{{replace_number(number_format($product['product_price1']*$product['product_count']))}}
                            تومان
                        </td>
                            <?php
                            $discount = (($product['product_price1'] * $product['product_count']) - ($product['product_price2'] * $product['product_count']));
                            ?>
                        <td>{{replace_number(number_format($discount))}}تومان </td>
                        <td>{{replace_number(number_format($product['product_price2']*$product['product_count']))}} تومان </td>
                    </tr>
                @endforeach
            @endforeach
        </table>

        <a href="{{ url('user/profile/orders/'.$order->id) }}">{{ url('user/profile/orders/'.$order->id) }}</a>

    </div>

</div>
</body>
</html>
