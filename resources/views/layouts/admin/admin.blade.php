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
        <span class="fa fa-bars" id="sidebarToggle"></span>
        <ul id="sidebar_menu">
            <li>
                <a>
                    <span class="fa fa-shopping-cart"></span>
                    <span class="sidebar_menu_text">محصولات</span>
                    <span class="fa fa-angle-left"></span>
                </a>
                <div class="child_menu">
                    <a href="{{url('admin/products')}}">مدیریت محصولات</a>
                    <a href="{{url('admin/products/create')}}">افزودن محصول</a>
                    <a href="{{url('admin/category')}}">مدیریت گروه محصولات</a>
                </div>
            </li>
            <li>
                <a>
                    <span class="fa fa-sliders"></span>
                    <span class="sidebar_menu_text">اسلایدر</span>
                    <span class="fa fa-angle-left"></span>
                </a>
                <div class="child_menu">
                    <a href="">مدیریت اسلایدرها</a>
                    <a href="">افزودن اسلایدر</a>
                </div>
            </li>
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
        <a  class="alert alert-success" onclick="delete_row()">بلی</a>
        <a  class="alert alert-danger" onclick="hide_box()">خیر</a>
    </div>
</div>

<div id="loading_box">
    <div class="loading_div">

        <i class="text-dark fas fa-2x fa-spinner fa-pulse"></i>
        <span  class="h5 text-dark">   چند لحظه صبر نمایید   </span>
    </div>
</div>
@yield('footer')
<script src="{{ asset('js/app.js') }}" ></script>
<script src="{{ asset('js/AdminVue.js') }}" ></script>
<script src="{{ asset('js/admin.js') }}" ></script>

</body>
</html>

