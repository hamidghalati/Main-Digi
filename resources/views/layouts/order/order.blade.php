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

    <link href="{{ asset('css/shop.css') }}" rel="stylesheet">

    <title>فروشگاه من</title>
</head>

<body>

    <div id="app">

        <div class="container-fluid">
            @yield('content')
        </div>

    </div>

    <!-- LOADING ANIMATION -->
    <div id="site-loading"></div>


   <div id="loading">
       <span class="loader"></span>
       <h6>لطفاً صبور باشید</h6>
   </div>

















    <script src="{{ asset('js/ShopVue.js') }}" type="text/javascript" ></script>
    <script src="{{ asset('js/shop.js') }}" type="text/javascript"></script>
    @yield('footer')

 </body>

</html>
