@extends('layouts.order.order')
@section('content')

    <div class="container">
        <article class="card">
            <div class="card-body">
                <div class="track">
                    <div class="step active"><span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">اطلاعات ارسال</span>
                    </div>
                    <div class="step active"><span class="icon"> <i class="fa fa-credit-card"></i> </span> <span
                            class="text"> پرداخت</span></div>
                    <div class="step active"><span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> اتمام خرید و ارسال </span>
                    </div>
                    {{--                    <div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">پیگیری</span> </div>--}}
                </div>

            </div>
        </article>
    </div>

    <div class="container-fluid">
        <?php

        use Hekmatinasser\Verta\Verta;

        $v = new Verta();
        $orderStatus = \App\Order::orderStatus();
        ?>


        <div class="profile_menu">
            <span class="profile_menu_title">
                جزییات سفارش : {{ replace_number($order->order_id) }}
            </span>
            <span class="profile_menu_title" style="padding: 0 20px 0;font-size: 12px">
                تاریخ ثبت سفارش :
                {{replace_number(verta($order->created_at)->formatJalaliDatetime())}}
            </span>

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
                            style="font-family: IRANSans">{{replace_number(number_format($order->price)).' تومان '}}</span>
                    </td>
                    <td>
                        مبلغ کل :
                        <span
                            style="font-family: IRANSans">{{replace_number(number_format($order->total_price)).' تومان '}}</span>
                    </td>
                </tr>

            </table>

            @foreach($order->getOrderInfo as $key=>$value)
                <div class="order_info_div">
                    <div class="header">
                        {{\App\Order::getOrderStatus($value['send_status'],$orderStatus)}}
                    </div>


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
                                <td>{{replace_number(number_format($product['product_price1']))}} تومان </td>
                                <td>{{replace_number(number_format($product['product_price1']*$product['product_count']))}} تومان </td>
                                <?php
                                    $discount=(($product['product_price1']*$product['product_count'])-($product['product_price2']*$product['product_count']));
                                    ?>
                                <td>{{replace_number(number_format($discount))}}</td>
                                <td>{{replace_number(number_format($product['product_price2']*$product['product_count']))}}</td>
                            </tr>
                        @endforeach
                    </table>


                </div>
            @endforeach


        </div>


    </div>

@endsection
