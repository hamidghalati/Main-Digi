@extends('layouts.order.order')
@section('content')


    <!-- LOADING ANIMATION -->
    <div id="site-loading"></div>

    <div class="container">
        <article class="card">
            <div class="card-body">
                <div class="track">
                    <div class="step active"> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">اطلاعات ارسال</span> </div>
                    <div class="step "> <span class="icon"> <i class="fa fa-credit-card"></i> </span> <span class="text"> پرداخت</span> </div>
                    <div class="step"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> اتمام خرید و ارسال </span> </div>
                    <div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">پیگیری</span> </div>
                </div>

            </div>
        </article>
    </div>

    <div class="container-fluid">
        <div class="row headline-checkout">
            <h6>انتخاب آدرس تحویل گیرنده :</h6>
        </div>
        <div class="page_row">
            <div>
                <address-list></address-list>
            </div>
        </div>
    </div>







@endsection

@section('footer')
    <script>

        jQuery(window).load(function () {
            "use strict";
            jQuery("body").find('#site-loading').fadeOut(500);
        });

    </script>
@endsection




{{--<div class="order_header">--}}


{{--        <ul class="checkout_steps">--}}
{{--            <li>--}}
{{--                <a class="checkout_steps">--}}
{{--                    <div class="step_item active_item" step-title="اطلاعات ارسال"></div>--}}
{{--                </a>--}}
{{--            </li>--}}

{{--            <li class="inactive">--}}
{{--                <a class="checkout_steps">--}}
{{--                    <div class="step_item " step-title="پرداخت"></div>--}}
{{--                </a>--}}
{{--            </li>--}}

{{--            <li class="inactive">--}}
{{--                <a class="checkout_steps">--}}
{{--                    <div class="step_item " step-title="اتمام خرید و ارسال"></div>--}}
{{--                </a>--}}
{{--            </li>--}}

{{--        </ul>--}}
{{--    </div>--}}
