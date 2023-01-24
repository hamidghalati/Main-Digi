@extends('layouts.mobile.mobile')
@section('content')
    <mobile-shopping-cart :cart_data="{{json_encode($cart_data)}}"></mobile-shopping-cart>
@endsection

