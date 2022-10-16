@extends('layouts.shop.shop')
@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('include.user_panel_menu',['active'=>'orders'])
        </div>

        <div class="col-md-9" style="padding: 0">
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

                @if(isset($error_payment))
                    <div class="alert alert-warning payment_warning">
                        <span>تراکنش نامعتبر است</span>
                        (در صورت کسر وجه از حساب شما، مبلغ مذکور طی ۷۲ ساعت به حساب شما عودت داده خواهد شد)
                    </div>
                @endif



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
                                <span
                                    style="font-family: IRANSans">{{replace_number(number_format($order->discount_value)).' تومان '}}</span>
                            </td>
                            <td>
                                کد کارت تخفیف :
                                <span
                                    style="font-family: IRANSans">{{$order->discount_code}}</span>
                            </td>
                        </tr>

                    @endif



                </table>

                @foreach($order->getOrderInfo as $key=>$value)
                    <div class="order_info_div">
                        <div class="header">
                            {{\App\Order::getOrderStatus($value['send_status'],$orderStatus)}}
                        </div>

                        <div class="swiper-container order_steps">
                            <div class="swiper-wrapper">
                                @foreach($orderStatus as $keys=>$status)
                                    @if($keys>-1)
                                        <div class="swiper-slide">
                                            <div class="step_div @if($value['send_status']<$keys) step_inactive @endif">
                                                <img src="{{url('files/images/steps/step'.$keys.'.png')}}" alt="" >
                                                <span  class="@if($value['send_status']>=$keys) text-success @endif">{{$status}}</span>
                                            </div>
                                            <hr class="@if($value['send_status']>=$keys) hr_active @endif">


                                        </div>
                                    @endif
                                @endforeach
                            </div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
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

    </div>
@endsection

@section('header')
    <link rel="stylesheet" href="{{asset('slick/slick/slick.css')}}">
    <link rel="stylesheet" href="{{asset('slick/slick/slick-theme.css')}}">

@endsection
@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-toastr/dist/vue-toastr.umd.min.js"></script>

    <script>
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 5,
            spaceBetween: 0,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });

    </script>

@endsection
