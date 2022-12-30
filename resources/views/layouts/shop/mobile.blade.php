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

        <div class="container-fluid">
            @yield('content')
        </div>

        @include('mobile.footer')

    </div>
</div>


<script src="{{ asset('js/ShopVue.js') }}" type="text/javascript"></script>

<script src="{{ asset('js/shop.js') }}" type="text/javascript"></script>

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
