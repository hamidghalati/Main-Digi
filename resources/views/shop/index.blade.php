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

    {{--        new product--}}
    <div class="row">
        @include('include.horizontal_product',['title'=>'جدیدترین محصولات فروشگاه','products'=>$new_product])
        @include('include.horizontal_product',['title'=>'پرفروش ترین محصولات فروشگاه','products'=>$best_selling_product])
    </div>


    {{--    @include('include.newProduct',['new_product'=>$new_product])--}}

@endsection

@section('header')
    <link rel="stylesheet" href="{{asset('css/swiper.min.css')}}">
    <link rel="stylesheet" href="{{asset('slick/slick/slick.css')}}">
    <link rel="stylesheet" href="{{asset('slick/slick/slick-theme.css')}}">

@endsection
@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>

    <script>




        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
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
            slidesToShow: 2,
            slidesToScroll: 1,
            rtl:true,
            infinite: false,

        });

    </script>

@endsection


