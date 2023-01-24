@extends('layouts.mobile.mobile')
@section('content')
    <?php

    use Hekmatinasser\Verta\Verta;

    $v = new Verta();
    $orderStatus = \App\Order::orderStatus();
    ?>

    <div>
        <div class="profile_item_header order_content_header">
            <div>
                <span>سفارش :</span>
                <span>{{ replace_number($order->order_id) }}</span>
            </div>
            <a href="{{ url('user/profile/orders') }}">
                <span>بازگشت</span>
                <i class="fa fa-angle-left"></i>
            </a>
        </div>

        <div class="profile_item order_content">
            <div class="profile_info_row remove_border">
                <span>تحویل گیرنده :</span>
                <span>{{$order->getAddress->name}}</span>
            </div>

            <div class="profile_info_row">
                <span>شماره تماس تحویل گیرنده :</span>
                <span>{{replace_number($order->getAddress->mobile)}}</span>
            </div>


            <div class="profile_info_row">
                <span>تعداد مرسوله : </span>
                <span>{{replace_number(sizeof($order->getOrderInfo))}}</span>
            </div>

            <div class="profile_info_row">
                <span>مبلغ قابل پرداخت  :</span>
                <span style="font-family: IRANSans">{{replace_number(number_format($order->price)).' تومان '}}</span>
            </div>

            <div class="profile_info_row">
                <span>مبلغ کل  :</span>
                <span
                    style="font-family: IRANSans">{{replace_number(number_format($order->total_price)).' تومان '}}</span>
            </div>

            <div class="profile_info_row">
                <span>تاریخ ثبت سفارش  :</span>
                <span>{{replace_number(verta($order->created_at)->formatJalaliDatetime())}}</span>
            </div>

            @if(!empty($order->gift_value)&& $order->gift_value>0)
                <div class="profile_info_row">
                    <span>مبلغ کارت هدیه :</span>
                    <span
                        style="font-family: IRANSans">{{replace_number(number_format($order->gift_value)).' تومان '}}</span>
                </div>

                <div class="profile_info_row">
                    <span>کد کارت هدیه :</span>
                    <span style="font-family: IRANSans">{{$order->getGiftCart->code}}</span>
                </div>
            @endif

            @if(!empty($order->discount_value)&& $order->discount_value>0)
                <div class="profile_info_row">
                    <span>مبلغ کارت تخفیف :</span>
                    <span
                        style="font-family: IRANSans">{{replace_number(number_format($order->discount_value)).' تومان '}}</span>
                </div>

                <div class="profile_info_row">
                    <span> کد کارت تخفیف :</span>
                    <span style="font-family: IRANSans">{{$order->discount_code}}</span>
                </div>
            @endif

            <div class="profile_info_row">
                <span>آدرس تحویل گیرنده :</span>

            </div>
            <p>{{'استان '.$order->getAddress->getProvince->name.' -  شهر '.$order->getAddress->getCity->name.' - '.$order->getAddress->address}}</p>


        </div>


        @foreach($order->getOrderInfo as $key=>$value)
            <div class="profile_item">
                <div class="header">
                    {{\App\Order::getOrderStatus($value['send_status'],$orderStatus)}}
                </div>

                <div class="swiper-container order_steps">
                    <div class="swiper-wrapper">
                        @foreach($orderStatus as $keys=>$status)
                            @if($keys>-1)
                                <div class="swiper-slide">
                                    <div class="step_div @if($value['send_status']<$keys) step_inactive @endif">
                                        <img src="{{url('files/images/steps/step'.$keys.'.png')}}" alt="">
                                        <span
                                            class="@if($value['send_status']>=$keys) text-success @endif">{{$status}}</span>
                                    </div>
                                    <hr class="@if($value['send_status']>=$keys) hr_active @endif">
                                </div>
                            @endif
                        @endforeach
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>

                <div class="profile_info_row">
                    <span>کد مرسوله :</span>
                    <span>{{replace_number($value['id'])}}</span>
                </div>

                <div class="profile_info_row">
                    <span> زمان تحویل سفارش :</span>
                    <span>{{$value['delivery_order_interval']}}</span>
                </div>

                <div class="profile_info_row">
                    <span> هزینه ارسال :</span>
                    <span>
                        @if($value['send_order_amount']==0)
                            رایگان
                        @else
                            {{replace_number(number_format($value['send_order_amount'])).' تومان '}}
                        @endif
                    </span>
                </div>

                <div class="profile_info_row">
                    <span> مبلغ این مرسوله :</span>
                    <span style="font-family: IRANSans">{{replace_number(number_format($order_data['order_row_amount'][$value->id]))}} تومان </span>
                </div>

                <div class="profile_info_row">
                    <span>نحوه ارسال :</span>
                    <span>پست پیشتاز</span>
                </div>

            </div>

            <div class="product_box">
                <div class="swiper-container products" id="order_product_box">
                    <div class="swiper-wrapper">
                        @foreach($order_data['row_data'][$value->id] as $product)
                            <div class="swiper-slide product">
                                <div style="position: relative">
                                    <span class="order_product_count">{{replace_number($product['product_count'])}}</span>
                                    <img src="{{url('files/thumb/'.$product['image_url'])}}" alt="">
                                </div>
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

                                    <li class="order_product_price">{{replace_number(number_format($product['product_price2']*$product['product_count']))}} تومان </li>
                                </ul>
                            </div>
                        @endforeach
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>

        @endforeach


    </div>

@endsection
@section('header')
    <link rel="stylesheet" src="{{asset('css/swiper.min.css')}}"/>

@endsection
@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>

    <script>
        const swiper = new Swiper('.order_steps', {
            slidesPerView: 2,
            spaceBetween: 0,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    </script>

    <script>
        const swiper2 = new Swiper('.products', {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    </script>

@endsection
