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
                            <span>
                                @if(Auth::check())
                                    @if(!empty(Auth::user()->name))
                                        {{(Auth::user()->name)}}
                                    @else
                                        {{replace_number(Auth::user()->mobile)}}
                                    @endif
                                @else
                                    ورود | ثبت نام
                                @endif
                            </span>
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
                        <a href="{{url('user/profile/orders')}}" class="dropdown-item order">پیگیری سفارشات</a>

                        @if(Auth::check())
                            <form method="post" action="{{url('logout')}}" id="logout_form">@csrf</form>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item logout">خروج از حساب کاربری</a>
                        @endif

                    </div>
                </div>
                <div class="header_divider"></div>

                <div class="cart-header-box">
                    <div class="btn-cart" data-toggle="dropdown">
                        <span id="cart-product-count" data-counter="{{replace_number(\App\Cart::get_product_count())}}">سبد خرید</span>
                    </div>
                    @if(\App\Cart::get_product_count()>0)
                        <div class="dropdown cart">
                            <div class="dropdown-menu">
                                <header-cart></header-cart>
                            </div>
                        </div>
                    @endif
                </div>
            </div>


        </div>
    </div>

    @include('include.CategoryList',['catList'=>$catList])
    <div class="container-fluid">
        @yield('content')
    </div>
    <div id="loading">
        <span class="loader"></span>
        <h6>لطفاً صبور باشید</h6>
    </div>


    <footer class="c-footer">
        <nav>
            <a href="">
                <div class="c-footer-feature-item-1">اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس</div>
            </a>
            <a href="">
                <div class="c-footer-feature-item-2">پشتیبانی 24 ساعته</div>
            </a>
            <a href="">
                <div class="c-footer-feature-item-3">پرداخت در محل</div>
            </a>
            <a href="">
                <div class="c-footer-feature-item-4">7 روز ضمانت بازگشت</div>
            </a>
            <a href="">
                <div class="c-footer-feature-item-5">ضمانت اصل بودن کالا</div>
            </a>
        </nav>
        <div class="row">
            <div class="col-md-3">
                <h6>راهنمای خرید از {{ env('SHOP_NAME','') }}</h6>
                <ul>
                    <li>
                        <a href="">نحوه ثبت سفارش</a>
                    </li>
                    <li>
                        <a href="">رویه ارسال سفارش</a>
                    </li>
                    <li>
                        <a href="">شیوه های پرداخت</a>
                    </li>
                </ul>
            </div>
            <div class="col-md-3">
                <h6>خدمات مشتریان</h6>
                <ul>
                    <li>
                        <a href="">پاسخ به پرسش های متداول</a>
                    </li>
                    <li>
                        <a href="">رویه بازگرداندن کالا</a>
                    </li>
                    <li>
                        <a href="">شرایط استفاده</a>
                    </li>
                    <li>
                        <a href="">حریم خصوصی</a>
                    </li>
                </ul>
            </div>
            <div class="col-md-3">
                <h6 style="text-align: center;">با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید</h6>
                {{--                <div class="form-group">--}}
                {{--                    <input type="text" class="form-control" placeholder="ایمیل شما">--}}
                {{--                    <button>ارسال</button>--}}
                {{--                </div>--}}
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="ایمیل" aria-label=""
                           aria-describedby="basic-addon1">

                    <div class="input-group-prepend">
                        <button class="btn btn-success" type="button">ارسال</button>
                    </div>
                </div>

                <div class="social_network">
                    <h5>همراه ما باشید!</h5>
                    <a href=""><i class="mdi mdi-instagram"></i></a>
                    <a href=""><i class="mdi mdi-twitter"></i></a>
                    <a href=""><i class="mdi mdi-whatsapp"></i></a>
                    <a href=""><i class="mdi mdi-facebook"></i></a>
                </div>
            </div>
            <div class="col-md-3">
                <h5 style="text-align: center;">مجوزهای فروشگاه</h5>
                <div style="text-align: center;">
                    <img src="{{url('files/images/enamad-full-star.png')}}" alt="">
                    <img src="{{url('files/images/rezi.png')}}" alt="">
                    <img src="{{url('files/images/kasbokar.png')}}" alt="">
                </div>
            </div>
        </div>

        <p>
            برای استفاده از مطالب {{ env('SHOP_NAME','') }}، داشتن «هدف غیرتجاری» و ذکر «منبع» کافیست. تمام حقوق اين
            وب‌سايت متعلق به {{ env('SHOP_NAME','') }} است.
        </p>

    </footer>

</div>


<script src="{{ asset('js/ShopVue.js') }}" type="text/javascript"></script>

<script src="{{ asset('js/shop.js') }}" type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.0/slick.min.js"></script>
@yield('footer')


<script>
    $('.product_list').slick({

        speed: 900,
        slidesToShow: 4,
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
