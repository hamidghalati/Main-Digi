@extends('layouts.mobile.mobile')
@section('header')
    <link rel="stylesheet" href="{{asset('css/nouislider.min.css')}}">
    <link rel="stylesheet" href="{{url('css/toggles-full.css')}}">
    <script type="text/javascript" src="{{asset('js/nouislider.min.js')}}"></script>

@endsection

@section('content')

    <div class="filter_header">
        <button class="filter_btn advanced_search_box">جستجوی پیشرفته</button>
        <button class="filter_btn sort_btn">مرتب سازی</button>
    </div>

    <div>
        <div id="selected_filter_box"></div>
        <mobile-product-box ></mobile-product-box>
    </div>

    <div class="mobile_data_box hide_box" id="filter_box">
        <div class="header">
            <span>{{ $brand->name }}</span>
            <a>
                <i style="font-size: 15px!important;" class="mdi mdi-close"></i>
            </a>
        </div>

        <div class="content">
            <div class="filter_bar">
                <button id="remove_all_filter" class="btn-secondary">پاک کردن همه</button>
                <div>
                    <div class="toggle-light" id="product_status"></div>
                    <span>فقط کالاهای موجود</span>
                </div>
            </div>

            <div class="item_box toggle_box">
                <div class="toggle-light" id="send_status"></div>
                <span>فقط کالاهای آماده ارسال</span>
            </div>

            <div class="item_box">

                <div class="title_box">
                    <span class="mdi mdi-plus-circle"></span>
                    <label for="">محدوده قیمت مورد نظر</label>
                </div>
                <div>
                    <div class="filter_box">
                        <div id="slider" class="price_range_slider"></div>
                        <ul class="filter_price_ul">
                            <li>
                                <div>از</div>
                                <div class="price" id="min_price"></div>
                                <div>تومان</div>
                            </li>
                            <li>
                                <div>تا</div>
                                <div class="price" id="max_price"></div>
                                <div>تومان</div>
                            </li>
                        </ul>


                    </div>
                </div>
            </div>

            @if(sizeof($brand->getCat)>0)
                <div class="item_box">
                    <div class="title_box">
                        <label for="">دسته بندی</label>
                    </div>
                    <ul class="search_category_ul">
                        <li class="parent">
                            <ul>
                                @foreach($brand->getCat as $key=>$value)
                                    <li data="category_param_{{$value->getCategory->id}}">
                                        <span class="check_box"></span>
                                        <span class="title">{{$value->getCategory->name}}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </li>
                    </ul>
                </div>
            @endif

            <div style="padding-bottom: 60px"></div>


        </div>

        <div id="filter_link" class="add_product_link">
            <span>جستجوی پیشرفته</span>
        </div>

    </div>
@endsection
@section('footer')
    <script type="text/javascript" src="{{url('js/toggles.min.js')}}"></script>
    <script>
        $('#send_status').toggles({
            type: 'Light',
            text: {'on': 'آماده ارسال', 'off': 'در حال آماده'},
            width: 85,
            direction: 'rtl',
            on: false

        });

        $('#product_status').toggles({
            type: 'Light',
            text: {'on': '', 'off': ''},
            width: 50,
            direction: 'rtl',
            on: false
        });

        // $('.toggle').toggles({click:false});


    </script>
@endsection
