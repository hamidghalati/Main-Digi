@extends('layouts.shop.mobile')

@section('head')
    <link rel="stylesheet" href="{{asset('css/swiper.min.css')}}">
    <link rel="stylesheet" href="{{asset('slick/slick/slick.css')}}">
    <link rel="stylesheet" href="{{asset('slick/slick/slick-theme.css')}}">
@endsection

@section('content')

    <div class="slider_box">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                @foreach($sliders as $key=>$value)
                    <div class="swiper-slide">
                        <a href="{{$value->url}}" >
                            <img src="<?= url('files/slider/'.$value->mobile_image_url)?>" alt="">
                        </a>
                    </div>
                @endforeach
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>

@endsection


@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>
{{--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>--}}
    <script>
        var sliders=new Swiper('.slider_box .swiper-container',{
            pagination:{
                el:'.swiper-pagination'
            }
        });
    </script>
@endsection
