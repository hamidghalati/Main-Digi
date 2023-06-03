@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت سفارشات','url'=>url('admin/orders')],
    ['title'=>'جزییات سفارشات','url'=>url('admin/orders/'.$order->id)]

    ]])
    <div class="panel">
        <div class="header">
            جزییات سفارشات : {{ replace_number($order->order_id) }}
        </div>

        <?php

        use Hekmatinasser\Verta\Verta;

        $v = new Verta();
        $orderStatus = \App\Order::orderStatus();
        ?>

        <div class="panel_content">

            <a href="{{ url('admin/orders/submission/factor/'.$order->id) }}" class="btn btn-primary"
               style="margin-right: 25px;" target="_blank">نمایش فاکتور</a>


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


                    <order-step :steps="{{json_encode($orderStatus)}}" :send_status="{{$value['send_status']}}"
                                :order_id="{{$value->id}}"></order-step>


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

                                            <li>
                                                <span>فروشنده :</span>
                                                <span>{{$product['seller']}}</span>
                                            </li>


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

                                            @if($product['send_status']==6)
                                                <li>
                                                    <a href="{{ url('admin/orders/return-product/'.$product['row_id']) }}">ثبت
                                                        به عنوان کالای مرجوعی</a>
                                                </li>
                                            @endif

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
                                <td>{{replace_number(number_format($discount))}}</td>
                                <td>
                                    {{replace_number(number_format($product['product_price2']*$product['product_count']))}}
                                    @if($product['commission']>0 && $product['send_status']>-1)
                                        <div class="alert alert-success"
                                             style="padding: 8px;border-radius: 0;margin-top: 15px">
                                            <span>کمیسیون :</span>
                                            {{ number_format($product['commission']) }} تومان
                                        </div>
                                    @endif

                                </td>
                            </tr>

                            @if($product['send_status']==-1)
                                <tr>

                                    <td colspan="3">
                                        این کالا توسط مشتری برگشت داده شده است
                                    </td>
                                    <td colspan="3">
                                        @php $p=$product['product_price2']*$product['product_count']; @endphp
                                        <span>هزینه قابل پرداخت به کاربر :</span>
                                        @php $return_product_price=get_return_product_price($product['cat_id'],$order_discount,$p) @endphp
                                        {{ number_format($return_product_price).'  تومان '  }}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        @if(!empty($product['tozihat']))
                                            <div style="width: 100%;display: flex;">
                                                <span style="margin-left: 10px;font-weight: bold;"> علت مرجوعی :</span>
                                                <span style="color: red">{{ $product['tozihat'] }}</span>
                                            </div>


                                        @endif

                                    </td>
                                </tr>
                            @endif

                        @endforeach
                    </table>


                </div>
            @endforeach

        </div>
    </div>

@endsection

@section('header')
    <link rel="stylesheet" href="{{asset('css/swiper.min.css')}}">
    {{--    <link rel="stylesheet" href="{{asset('slick/slick/slick.css')}}">--}}
    {{--    <link rel="stylesheet" href="{{asset('slick/slick/slick-theme.css')}}">--}}

@endsection
@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>
    {{--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>--}}

    <script>
        $('#sidebarToggle').click();
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
