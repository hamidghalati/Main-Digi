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

    @if(sizeof($incredible_offers)>0)
        <img class="incredible_offers_image" src="{{ url('files/images/special_title_box.png') }}" alt="">
        <div class="index_product_box">
            <div class="product_box">
                <div class="swiper-container products">
                    <div class="swiper-wrapper">
                        @foreach($incredible_offers as $key=>$value)
                            <div class="swiper-slide product">
                                <a href="{{url('product/dkp-'.$value->getProduct->id.'/'.$value->getProduct->product_url)}}">
                                    <div style="position: relative">
                                            <span class="discount-badge">

                                         <?php

                                                    $a = ($value->price2 / $value->price1) * 100;
                                                    $a = 100 - $a;
                                                    $a = round($a);
                                                    ?>
                                                {{'%'.replace_number($a)}}

                                    </span>
                                        <img src="{{url('files/thumb/'.$value->getProduct->image_url)}}" alt="">
                                    </div>
                                    <p class="title">
                                        @if(strlen($value->getProduct->title)>33)
                                            {{mb_substr($value->getProduct->title,0,20).'...'}}
                                        @else
                                            {{$value->getProduct->title}}
                                        @endif
                                    </p>
                                    @if($value->product_number>0)
                                        <del class="price_tag">
                                        {{replace_number(number_format($value->price1)).'تومان'}}
                                        </del>

                                        <span class="price price_tag">
                                        {{replace_number(number_format($value->price2)).'تومان'}}
                                        </span>

                                        <div class="offers_counter">
                                            <counter second="<?= $value->offers_last_time-time()?>"></counter>
                                        </div>
                                    @endif
                                </a>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    @endif

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
            slidesPerView: 2,
            spaceBetween: 10,
        });
    </script>
@endsection
