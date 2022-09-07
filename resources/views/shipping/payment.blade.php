@extends('layouts.order.order')
@section('content')




    <div class="container">
        <article class="card">
            <div class="card-body">
                <div class="track">
                    <div class="step active"> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">اطلاعات ارسال</span> </div>
                    <div class="step active"> <span class="icon"> <i class="fa fa-credit-card"></i> </span> <span class="text"> پرداخت</span> </div>
                    <div class="step"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> اتمام خرید و ارسال </span> </div>
                    <div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">پیگیری</span> </div>
                </div>

            </div>
        </article>
    </div>




    <div class="container-fluid">
        <div class="row headline-checkout">
            <h6>انتخاب شیوه پرداخت :</h6>
        </div>
        <div class="page_row">
            <div class="page-content">

                <div class="shipping_data_box payment_box">
                    <span class="radio_check active_radio_check"></span>
                    <span>پرداخت اینترنتی (آنلاین با تمام کارت های بانکی)</span>
                </div>

                <h6>خلاصه سفارش</h6>

                <div class="shipping_data_box" style="padding-right: 15px;padding-left: 15px">
                    <?php $i=1;
                    ?>
                    @if($send_type==1)
                    @else

                        @foreach($send_order_data['delivery_order_interval'] as $key=>$value)
                            <div class="shipping_data_box" style="padding: 0">
                                <div class="header_box">
                                    <div>
                                        مرسوله {{replace_number($i)}} از {{replace_number(sizeof($send_order_data['delivery_order_interval']))}}
                                        <span>({{replace_number(sizeof($send_order_data['array_product_id'][$key]))}}) کالا </span>
                                    </div>
                                    <div>
                                        نحوه ارسال :
                                        <span>پست پیشتاز </span>
                                    </div>

                                    <div>
                                         ارسال از :
                                        <span>
                                            @if($value['send_order_day_number']==0)
                                                آماده ارسال
                                            @else
                                                {{replace_number($value['send_order_day_number'])}} روز کاری
                                            @endif
                                        </span>
                                    </div>

                                    <div>
                                        هزینه ارسال :
                                        <span>{{ $value['send_fast_price'] }} </span>
                                    </div>

                                </div>
                                <div class="ordering_product_list swiper-container">
                                    <div class="swiper-wrapper">
                                        @foreach($send_order_data['array_product_id'][$key] as $key2=>$value2)
                                            <p>{{$send_order_data['cart_product_data'][$value2.'_'.$key2]['product_title']}}</p>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                            <?php $i++ ?>
                        @endforeach

                    @endif
                </div>

            </div>
        </div>
    </div>










@endsection
