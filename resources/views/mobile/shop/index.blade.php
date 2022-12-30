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
                        <a href="{{$value->url}}">
                            <img src="<?= url('files/slider/'.$value->mobile_image_url)?>" alt="">
                        </a>
                    </div>
                @endforeach
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>

    <div class="index_product_box">
        @include('include.mobile.horizontal_product_list',['title'=>'جدیدترین محصولات فروشگاه','products'=>$new_product])
    </div>

    <div class="banners_div">
        <img src="{{ url('files/images/direct-access2.jpg') }}" alt="">
    </div>
    <div class="banners_div">
        <img src="{{ url('files/images/direct-access6.jpg') }}" alt="">
    </div>

    <div class="index_product_box">
        @include('include.mobile.horizontal_product_list',['title'=>'پرفروش ترین محصولات فروشگاه','products'=>$best_selling_product])
    </div>

@endsection


@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>
    {{--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>--}}
    <script>
        var sliders = new Swiper('.slider_box .swiper-container', {
            pagination: {
                el: '.swiper-pagination'
            }
        });

        var product_slider = new Swiper('.products', {
           slidesPerView:2,
            spaceBetween: 10,
        });
    </script>
@endsection
