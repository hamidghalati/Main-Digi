@extends('layouts.shop.shop')
@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('include.user_panel_menu',['active'=>'address'])
        </div>


        <div class="col-md-9" style="padding: 0">
            <span class="profile_menu_title" style="padding:20px 10px">آدرس های من</span>

            <div class="profile_address">
                <input type="hidden" id="lat" name="lat" value="0.0">
                <input type="hidden" id="lng" name="lng" value="0.0">
                <profile-address></profile-address>
            </div>

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
