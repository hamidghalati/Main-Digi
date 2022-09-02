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
    <script type="text/javascript" src="{{url('js/cedarmaps.js')}}"></script>
    <script type="text/javascript" src="{{url('js/leaflet.rotatedMarker.js')}}"></script>
    <script>

        jQuery(window).load(function () {
            "use strict";
            jQuery("body").find('#site-loading').fadeOut(500);
        });

        // let lat='38.0412';
        // let lng='46.3993';
        // let marker=null;
        // let map=null;

        L.cedarmaps.accessToken = "2192ad1e2821d1104b431cd42c40b3cde410bac8""; // See the note below on how to get an access token

        // Getting maps info from a tileJSON source
        var tileJSONUrl = 'https://api.cedarmaps.com/v1/tiles/cedarmaps.streets.json?access_token=' + L.cedarmaps.accessToken;

        // initilizing map into div#map
        var map = L.cedarmaps.map('map', tileJSONUrl, {
            scrollWheelZoom: true
        }).setView([35.757448286487595, 51.40876293182373], 15);

        // marker=L.marker([lat,lng]).addTo(map);

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
