@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت مرسوله ها','url'=>url('admin/orders/submission')],
    ['title'=>'جزئیات مرسوله','url'=>url('admin/orders/submission/'.$submission_info->id)]
    ]])
    <div class="panel">
        <div class="header">
            جزئیات مربوط به مرسوله : {{ replace_number($submission_info->id) }}
        </div>

        <?php

        use Hekmatinasser\Verta\Verta;

        $v = new Verta();
        $orderStatus = \App\Order::orderStatus();
        $order=$submission_info->getOrder;
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

        <div class="panel_content">

            <div class="order_info_div">
                <div class="header">
                    {{\App\Order::getOrderStatus($submission_info->send_status,$orderStatus)}}
                </div>




                <order-step :steps="{{json_encode($orderStatus)}}" :send_status="{{$submission_info->send_status}}" :order_id="{{$submission_info->id}}"></order-step>



                <table class="table table-bordered order_table_info">
                    <tr>
                        <td>
                            کد مرسوله :
                            <span>{{replace_number($submission_info['id'])}}</span>
                        </td>
                        <td>
                            زمان تحویل سفارش :
                            <span>{{$submission_info['delivery_order_interval']}}</span>
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
                                @if($submission_info['send_order_amount']==0)
                                    رایگان
                                @else
                                    {{replace_number(number_format($submission_info['send_order_amount'])).' تومان '}}
                                @endif
                            </span>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2" style="text-align: center">
                            مبلغ این مرسوله :
                            <span style="font-family: IRANSans">{{replace_number(number_format($order_data['order_row_amount'][$submission_info->id]))}} تومان </span>
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
