@extends('layouts.shop.shop')

@section('content')
    <div class="row slider">
        <div class="col-2">
            <div>
                <a href="{{url('')}}">
                    <img src="{{url('files/images/direct-access1.jpg')}}" alt=""
                         @if(sizeof($incredible_offers)==0) style="height: 154px" @endif class="index-pic">
                </a>
                <a href="{{url('')}}">
                    <img src="{{url('files/images/direct-access5.jpg')}}" alt=""
                         @if(sizeof($incredible_offers)==0) style="height: 154px" @endif class="index-pic">
                </a>
                @if(sizeof($incredible_offers)>0)
                    <a href="{{url('')}}">
                        <img src="{{url('files/images/direct-access3.jpg')}}" alt="" class="index-pic">
                    </a>
                    <a href="{{url('')}}">
                        <img src="{{url('files/images/direct-access4.jpg')}}" alt="" class="index-pic">
                    </a>
                @endif
            </div>
        </div>
        <div class="col-10">

            @include('include.slider',['sliders'=>$sliders])

            @include('include.incredible_offers',['incredible_offers'=>$incredible_offers])


        </div>
    </div>

    <div class="row">
        @if(sizeof($randomProduct)>1)
            <div class="col-md-9">
                @include('include.horizontal_product',['title'=>'جدیدترین محصولات فروشگاه','products'=>$new_product])
            </div>
            <div class="col-md-3 promo_single">
                <div class="promo_single_header">
                    <span>پیشنهادات لحظه ای برای شما</span>
                </div>
                @foreach($randomProduct as $key=>$value)
                    <a data-swiper-slide-index="{{ $key }}" href="{{ url('product/dkp-'.$value->id.'/'.$value->product_url) }}" @if($key==0) class="active" @endif>
                        <img src="{{ url('files/thumb/'.$value->image_url) }}" alt="">
                        <p class="title">
                            @if(strlen($value->title)>50)
                                {{ mb_substr($value->title,0,33).'...' }}
                            @else
                                {{ $value->title }}
                            @endif
                        </p>
                            <?php  $price1=$value->price+$value->discount_price;?>
                        <p class="discount_price">
                            @if(!empty($value->discount_price))
                                <del>{{replace_number(number_format($price1))}}</del>
                            @endif
                        </p>
                        <p class="price">
                            {{replace_number(number_format($value->price)).'تومان'}}
                        </p>
                    </a>
                @endforeach
            </div>
        @else
            @include('include.horizontal_product',['title'=>'جدیدترین محصولات فروشگاه','products'=>$new_product])
        @endif
    </div>

    {{--        new product--}}
    <div class="row">
        @include('include.horizontal_product',['title'=>'پرفروش ترین محصولات فروشگاه','products'=>$best_selling_product])
    </div>


    {{--    @include('include.newProduct',['new_product'=>$new_product])--}}

@endsection

@section('header')
    <link rel="stylesheet" href="{{asset('css/swiper.min.css')}}">
    <link rel="stylesheet" href="{{asset('slick/slick/slick.css')}}">
    <link rel="stylesheet" href="{{asset('slick/slick/slick-theme.css')}}">

@endsection

@section('seo')
    <meta name="description" content="{{ config('shop-info.description') }}">
    <meta name="keywords" content="{{ config('shop-info.keywords') }}">
    <meta property="og:site_name" content="{{ config('shop-info.shop_name') }}" />
    <meta property="og:description" content="{{ config('shop-info.description') }}" />
    <meta property="og:title" content="{{config('shop-info.shop_name')}}" />
    <meta property="og:locale" content="fa_IR" />
@endsection

@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>

    <script>




        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 6,
            spaceBetween: 30,
            navigation: {
                nextEl: '.slick-next',
                prevEl: '.slick-prev',

            }
        });
        <?php
        if (sizeof($incredible_offers) < 6)
        {
        ?>
        $(".discount_box_footer .slick-next").hide();
        $(".discount_box_footer .slick-prev").hide();
        <?php
        }
        ?>
        $('.product_list').slick({

            speed: 900,
            slidesToShow: 6,
            slidesToScroll: 1,
            rtl:true,
            infinite: false,

        });

    </script>

@endsection


