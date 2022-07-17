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
    <link href="{{ asset('css/shop.css') }}" rel="stylesheet">
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    <title>فروشگاه من</title>
</head>

<body>

    <div id="app">
        <div class="header">

            <a href="{{url('/')}}">
                <img src="{{asset('files/images/logo.svg')}}" alt="" class="shop_logo">
            </a>

            <div class="header_row">

                <div class="input-group index_header_search">
                    <input type="text" class="form-control" id="inlineFormInputGroup"
                        placeholder="نام کالا، برند و یا دسته مورد نظر خود را جستجو کنید...">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <span class="mdi mdi-magnify"></span>
                        </div>
                    </div>
                </div>

                <div class="header_action">
                    <div class="dropdown">
                        <div class="index_auth_div" role="button" data-toggle="dropdown">
                            <span>ورود | ثبت نام</span>
                            <span class="mdi mdi-menu-down"></span>
                        </div>

                        <div class="dropdown-menu header-auth-box" aria-labelledby="dropdownMenuButton">
                            @if(Auth::check())
                            @if(Auth::user()->role_id>0 || Auth::user()->role=='admin')
                            <a class="dropdown-item admin" href="{{url('admin')}}">پنل مدیریت</a>

                            @endif
                            @else
                            <a class="btn btn-primary" href="{{url('login')}}">ورود به دیجی کالا</a>
                            <div class="register-link">
                                <span>کاربر جدید هستید؟</span>
                                <a class="link" href="{{url('register')}}">ثبت نام</a>
                            </div>
                            <div class="dropdown-divider"></div>

                            @endif
                            <a href="{{url('profile')}}" class="dropdown-item profile">

                                پروفایل</a>
                            <a href="{{url('profile/orders')}}" class="dropdown-item order">پیگیری سفارشات</a>

                            @if(Auth::check())
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item logout">خروج از حساب کاربری</a>
                            @endif

                        </div>
                    </div>
                    <div class="header_divider"></div>

                    <div class="cart-header-box">
                        <div class="btn-cart">
                            <span id="cart-product-count" data-counter="۰">سبد خرید</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>

  @include('include.CategoryList',['catList'=>$catList])
{{--        @include('include.Menu')--}}
        <div class="container-fluid">
            @yield('content')
        </div>

    </div>


    <script src="{{ asset('js/shop.js') }}" type="text/javascript"></script>
    @yield('footer')
</body>

</html>
