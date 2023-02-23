<!doctype html>
<html lang="fa">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    @yield('header')

    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>

    <link href="{{ asset('css/mobile.css') }}" rel="stylesheet">
    <link href="{{ asset('css/main.css') }}" rel="stylesheet">

    <title>فروشگاه من</title>
</head>

<body>

<div id="app">

{{--     Menu   --}}
    @include('mobile.CatList')
{{--    End Menu --}}

    <div>
        <div class="header">
            <span id="align-justify" class="fa fa-align-justify"></span>
            <a href="{{ url('/') }}">
                <span> {{ env('SHOP_NAME','') }}</span>
            </a>
            <span></span>
        </div>

        <div class="navbar">
            <div class="input-group index_search_form">
                <input type="text" class="form-control" id="inlineFormInputGroup"
                       placeholder="جستجو .....">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <span class="mdi mdi-magnify"></span>
                    </div>
                </div>
            </div>
            <div>
                <a href="{{ url('Cart') }}" style="position: relative">
                    @if(\App\Cart::get_product_count()>0)
                        <span class="cart_product_count">{{ replace_number(\App\Cart::get_product_count()) }}</span>
                    @endif
                    <span class="mdi mdi-shopping-outline"></span>
                </a>

                @if(Auth::check())
                    <a href="{{ url('user/profile') }}"><span class="fa fa-user"></span></a>
                @else
                    <a href="{{ url('login') }}"><span class="fa fa-user"></span></a>
                @endif

            </div>
        </div>

        <div class="container-fluid">
            @yield('content')
        </div>


        <div id="loading">
            <span class="loader"></span>
            <h6>لطفاً صبور باشید</h6>
        </div>






        @include('mobile.footer')

    </div>
</div>


<script src="{{ asset('js/ShopVue.js') }}" type="text/javascript"></script>

<script src="{{ asset('js/main.js') }}" type="text/javascript"></script>
<script src="{{ asset('js/mobile.js') }}" type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.0/slick.min.js"></script>
@yield('footer')


<script>
    $('.product_list').slick({

        speed: 900,
        slidesToShow: 2,
        slidesToScroll: 1,
        rtl: true,
        infinite: false,

    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });



</script>




</body>

</html>
