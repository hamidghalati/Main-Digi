@extends('layouts.order.mobile_order')
@section('content')
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

    <div class="page_row">
        <div class="page-content">
            <form action="{{url('payment')}}" id="add_order" method="post">
                @csrf
                <input type="hidden" id="address_id" name="address_id">
                <input type="hidden" id="lat" name="lat" value="0.0">
                <input type="hidden" id="lng" name="lng" value="0.0">
                <input type="hidden" id="send_type" name="send_type" value="1">

            </form>
            <mobile-address-list :data="{{ json_encode($address) }}"></mobile-address-list>
        </div>
    </div>

@endsection
@section('header')


    <link href="https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
    <link rel="stylesheet" href="{{url('css/dist/leaflet.awesome-markers.css')}}">

    <script src="https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.js" type="text/javascript"></script>



@endsection

@section('footer')

    <script src="{{url('js/dist/leaflet.awesome-markers.js')}}" type="text/javascript"></script>
    <script src="{{url('js/server.js')}}" type="text/javascript"></script>

    <script src="{{ asset('js/shop.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Map.js') }}" type="text/javascript"></script>

@endsection
