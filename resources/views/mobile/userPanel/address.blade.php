@extends('layouts.mobile.mobile')
@section('content')
    <?php $jdf = new \App\Lib\jdf() ?>




    <div>
        <div class="profile_item_header order_content_header">
            <div>
                <span>آدرس های من</span>
            </div>
        </div>
    </div>


        <input type="hidden" id="lat" name="lat" value="0.0">
        <input type="hidden" id="lng" name="lng" value="0.0">
       <div style="margin: 10px">
           <profile-address :layout="'mobile'"></profile-address>
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
