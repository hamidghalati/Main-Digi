@extends('layouts.shop.shop')

@section('content')

    <shopping-cart :cart_data="{{json_encode($cart_data)}}"></shopping-cart>

@endsection
