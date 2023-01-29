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
            <span>{{ $category->name }}</span>
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

                    <button class="btn btn-primary" id="price_filter_btn">
                        <span class="fa fa-filter"></span>
                        <span> اعمال محدوده قیمت </span>
                    </button>
                    </div>
                </div>
            </div>

            @if(isset($category)&& sizeof($category->getChild)>0)
                <div class="item_box">
                    <div class="title_box">
                        <label for="">دسته بندی</label>
                    </div>
                    <ul class="search_category_ul">
                        <li class="parent">
                            <a href="{{ url('search/'.$category->url) }}">{{$category->name}}</a>
                            <ul>
                                @foreach($category->getChild as $cat)
                                    <li>
                                        <a href="{{ url('search/'.$cat->url) }}">{{$cat->name}}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </li>
                    </ul>
                </div>
            @endif

            @if(isset($brands) && sizeof($brands)>0)
                <div class="item_box">
                    <div class="title_box">
                        <i class="mdi mdi-plus-circle"></i>
                        <label for="">برند</label>
                    </div>
                    <div>
                        <div class="filter_box filter_brand_div">

                            <input class="form-control" type="text" id="brand_search"
                                   placeholder="جستجوی نام برند">

                            <ul class="list-inline product_cat_ul brand_list">
                                @foreach($brands as $key=>$value)

                                    <li data="brand_param_{{$value->brand_id}}">
                                        <span class="check_box"></span>
                                        <span class="title">{{$value->getBrand->brand_name}}</span>
                                        <span class="ename">{{$value->getBrand->brand_ename}}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            @endif

            @if(isset($filter))
                @foreach($filter as $key=>$value)
                    <div class="item_box">
                        <div class="title_box">
                            <i class="mdi mdi-plus-circle"></i>
                            <label for="">{{$value->title}}</label>
                        </div>
                        <div>
                            <div class="filter_box">
                                <ul class="list-inline product_cat_ul">
                                    @foreach($value->getChild as $key2=>$value2)
                                            <?php
                                            $filter_key = 'attribute['.$value->id.']';
                                            ?>
                                        <li data="{{$filter_key}}_param_{{$value2->id}}">
                                            <span class="check_box"></span>
                                            <span class="title">{{$value2->title}}</span>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif

            @if(sizeof($colors)>1)
                <div class="item_box">
                    <div class="title_box">
                        <i class="mdi mdi-plus-circle"></i>
                        <label for="">رنگ ها</label>
                    </div>
                    <div>
                        <div class="filter_box">
                            <ul class="list-inline product_cat_ul color_filter_ul">
                                @foreach($colors as $key=>$value)

                                    <li data="color_param_{{$value->id}}">
                                        <div>
                                            <span class="check_box"></span>
                                            <span class="title">{{$value->name}}</span>

                                        </div>
                                        <div>
                                            <div
                                                style="background:<?= $value->code ?>; @if($value->name=='سفید') border: 1px solid black;  @endif  "
                                                class="color_div"></div>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
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
