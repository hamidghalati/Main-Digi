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
    <link href="{{ asset('css/auth.css') }}" rel="stylesheet">

    <title>فروشگاه من</title>
</head>

<body>

<div id="app">



    <div class="container-fluid">
        @yield('content')
    </div>

</div>









@yield('footer')

<script src="{{ asset('js/app.js') }}" ></script>
@yield('footer')
<script src="{{ asset('js/shop.js') }}" ></script>
<script>

        startTime();

</script>
</body>

</html>
