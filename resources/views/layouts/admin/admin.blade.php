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
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css"/>

    <title>پنل مدیریت</title>
</head>
<body>

<div class="container-fluid">
    <div class="page-sidebar">
        <?php
        $sideBarMenu = array();
        $sideBarMenu[0] = [
            'label' => 'محصولات',
            'icon' => 'fa fa-shopping-cart',
            'access' => 'products|category',
            'child' => [
                ['url' => url('admin/products'), 'label' => 'مدیریت محصولات', 'access' => 'products'],
                ['url' => url('admin/products/create'), 'label' => 'افزودن محصول', 'access' => 'products', 'accessValue' =>'products_edit'],
                ['url' => url('admin/category'), 'label' => 'مدیریت گروه محصولات', 'access' => 'category'],
            ]
        ];
        $sideBarMenu[1] = [
            'label' => 'اسلایدر',
            'icon' => 'fa fa-sliders',
            'access' => 'sliders',
            'child' => [
                ['url' => url('admin/sliders'), 'label' => 'مدیریت اسلایدرها', 'access' => 'sliders'],
                ['url' => url('admin/sliders/create'), 'label' => 'افزودن اسلایدر', 'access' => 'sliders'],
            ]
        ];
        $sideBarMenu[2] = [
            'label' => 'مناطق',
            'icon' => 'fa fa-location',
            'access' => 'location',
            'child' => [
                ['url' => url('admin/province'), 'label' => 'مدیریت استان ها', 'access' => 'location'],
                ['url' => url('admin/city'), 'label' => 'مدیریت شهرها', 'access' => 'location'],
            ]
        ];
        $sideBarMenu[3] = [
            'label' => 'سفارشات',
            'icon' => 'fa fa-list',
            'access' => 'orders',
            'child' => [
                ['url' => url('admin/orders'), 'label' => 'مدیریت سفارشات', 'access' => 'orders', 'accessValue' => 0],
                ['url' => url('admin/orders/submission'), 'label' => 'مدیریت مرسوله ها', 'access' => 'orders', 'accessValue' => 4],
                ['url' => url('admin/orders/submission/approved'), 'label' => ' مرسوله های تأیید شده', 'access' => 'orders', 'accessValue' => 5],
                ['url' => url('admin/orders/submission/items/today'), 'label' => ' مرسوله های ارسالی امروز', 'access' => 'orders', 'accessValue' => 6],
                ['url' => url('admin/orders/submission/ready'), 'label' => ' مرسوله های آماده ارسال', 'access' => 'orders', 'accessValue' => 7],
                ['url' => url('admin/orders/submission/posting/send'), 'label' => ' مرسوله های ارسال شده به پست', 'access' => 'orders', 'accessValue' => 8],
                ['url' => url('admin/orders/submission/posting/receive'), 'label' => ' مرسوله های آماده دریافت از پست', 'access' => 'orders', 'accessValue' => 9],
                ['url' => url('admin/orders/delivered/shipping'), 'label' => ' مرسوله های تحویل داده شده', 'access' => 'orders', 'accessValue' => 10],

            ]
        ];
        $sideBarMenu[4] = [
            'label' => 'مدیریت فایل ها',
            'icon' => 'fa fa-folder-open',
            'access' => 'file_manager',
            'url' => url('admin/file_manager')
        ];
        $sideBarMenu[5] = [
            'label' => 'گزارشات',
            'icon' => 'fa fa-line-chart',
            'access' => 'report|commission',
            'child' => [
                ['url' => url('admin/report/sale'), 'label' => 'آمار فروش', 'access' => 'report'],
                ['url' => url('admin/report/view'), 'label' => 'آمار بازدید', 'access' => 'report'],
                ['url' => url('admin/commissions'), 'label' => 'کمیسیون ها', 'access' => 'commission'],
            ]
        ];
        $sideBarMenu[12] = [
            'label' => 'انبار',
            'icon' => 'fa fa-ambulance',
            'access' => 'stockrooms',
            'child' => [
                ['url' => url('admin/stockrooms'), 'label' => 'مدیریت انبار ها', 'access' => 'stockrooms','accessValue' =>'stockroom_edit'],
                ['url' => url('admin/stockroom/input'), 'label' => 'ورودی های انبار', 'access' => 'stockrooms','accessValue' =>'add_input'],
                ['url' => url('admin/stockroom/output'), 'label' => 'خروجی های انبار', 'access' => 'stockrooms','accessValue' =>'add_output'],
            ]
        ];

        $sideBarMenu[20] = [
            'label' => 'صفحات اضافی',
            'icon' => 'fa fa-file',
            'access' => 'pages',
            'child' => [
                ['url' => url('admin/pages'), 'label' => 'مدیریت صفحات', 'access' => 'pages'],
                ['url' => url('admin/pages/create'), 'label' => 'افزودن صفحه جدید', 'access' => 'pages'],
            ]
        ];

        $sideBarMenu[30] = [
            'label' => 'تنظیمات',
            'icon' => 'fa fa-cogs',
            'access' => 'setting',
            'child' => [
                ['url' => url('admin/setting/shop'), 'label' => 'فروشگاه', 'access' => 'setting'],
                ['url' => url('admin/setting/send-order-price'), 'label' => 'هزینه ارسال سفارشات', 'access' => 'setting'],
                ['url' => url('admin/setting/payment-gateway'), 'label' => 'درگاه پرداخت', 'access' => 'setting'],
            ]
        ];


        ?>
        <span class="fa fa-bars" id="sidebarToggle"></span>
{{--        @php $access=json_decode($access); @endphp--}}
        <ul id="sidebar_menu">
            @foreach($sideBarMenu as $key=>$value)
                    <?php $child = array_key_exists('child', $value) ?>
                @if(checkParentMenuAccess($access ?? '' ,$value['access']))
                    <li>
                        <a @if(array_key_exists('url',$value)) href="{{$value['url']}}" @endif>
                            <span class="{{$value['icon']}}"></span>
                            <span class="sidebar_menu_text">{{$value['label']}}</span>
                            @if($child) <span class="fa fa-angle-left"></span> @endif
                        </a>
                        @if($child)
                            <div class="child_menu">
                                @foreach($value['child'] as $key2=>$value2)
                                    @if(checkAddChildMenuAccess($access ?? '',$value2))
                                        <a href="{{$value2['url']}}">{{$value2['label']}}</a>
                                    @endif
                                @endforeach
                            </div>
                        @endif


                    </li>
                @endif
            @endforeach

        </ul>


    </div>
    <div class="page-content">
        <div class="content_box" id="app">
            @yield('content')

        </div>

    </div>
</div>

<div class="message_div">
    <div class="message_box">
        <p id="msg"></p>
        <a class="alert alert-success" onclick="delete_row()">بلی</a>
        <a class="alert alert-danger" onclick="hide_box()">خیر</a>
    </div>
</div>

<div id="loading_box">
    <div class="loading_div">

        <i class="text-dark fas fa-2x fa-spinner fa-pulse"></i>
        <span class="h5 text-dark">   چند لحظه صبر نمایید   </span>
    </div>
</div>

<div id="loading">
    <span class="loader"></span>
    <h6>لطفاً صبور باشید</h6>
</div>

<div class="server_error_box" id="server_error_box">
    <div>
        <span class="fa fa-warning"></span>
        <span id="message">خطا در ارسال درخواست، مجدداً تلاش نمایید</span>
    </div>
</div>


<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('js/AdminVue.js') }}"></script>
@yield('footer')
<script src="{{ asset('js/admin.js') }}"></script>


</body>
</html>

