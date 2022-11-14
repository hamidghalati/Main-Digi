@extends('layouts.shop.shop')
@section('content')

    <div class="row" id="product_box">
        <div class="col-3">

            <div class="item_box">
                <div class="brand_info">
                    <img src="{{url('files/upload/'.$brand->brand_icon)}}" alt="">
                    <p>{{ $brand->brand_name }}</p>
                    <p><a href="{{url('brands/'.$brand->brand_ename)}}">{{$brand->brand_ename}}</a></p>
                </div>
            </div>

            @if(sizeof($brand->getCat)>0)
                <div class="item_box">
                    <div class="title_box">
                        <label for="">دسته بندی</label>
                        <span class="fa fa-angle-down"></span>
                    </div>
                    <div>
                        <div class="filter_box filter_brand_div" style="display: block">

                            <input class="form-control" type="text" id="brand_search"
                                   placeholder="جستجوی نام برند">

                            <ul class="list-inline product_cat_ul brand_list">
                                @foreach($brand->getCat as $key=>$value)

                                    <li data="category_param_{{$value->getCategory->id}}">
                                        <span class="check_box"></span>
                                        <span class="title">{{$value->getCategory->name}}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            @endif

            <div class="item_box">
                <div class="title_box">
                    <label for=""> جستجو در نتایج :</label>
                    <span class="fa fa-angle-down"></span>
                </div>
                <div>
                    <input type="text" @if(array_key_exists('string',$_GET))
                        value="{{ $_GET['string'] }}" @endif id="search_input"
                           placeholder="نام محصول یا برند مورد نظر خود را وارد نمایید">
                </div>
            </div>

            <div class="item_box toggle_box">
                <div class="toggle-light" id="product_status"></div>
                <span>فقط کالاهای موجود</span>
            </div>

            <div class="item_box toggle_box">
                <div class="toggle-light" id="send_status"></div>
                <span>فقط کالاهای آماده ارسال</span>
            </div>

            <div class="item_box">

                <div class="title_box">
                    <label for="">محدوده قیمت مورد نظر</label>
                    <span class="fa fa-angle-down"></span>
                </div>
                <div>
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
        <div class="col-9">
            <div style="display: flex;justify-content: space-between;align-items: center">
                <ul class="list-inline map_ul">
                    <li>
                        <a href="{{url('/')}}">فروشگاه</a>
                        /
                    </li>
                    <li><a href="{{url('brands/'.$brand->brand_ename)}}">{{$brand->brand_name}}</a> </li>


                </ul>
                <div id="product_count">

                </div>
            </div>
            <product-box :compare="'no'"></product-box>
        </div>

    </div>
@endsection
@section('header')
    <link rel="stylesheet" href="{{asset('css/nouislider.min.css')}}">
    <link rel="stylesheet" href="{{url('css/toggles-full.css')}}">
    <script type="text/javascript" src="{{asset('js/nouislider.min.js')}}"></script>

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
            text: {'on': 'موجود', 'off': 'ناموجود'},
            width: 85,
            direction: 'rtl',
            on: false
        });

        // $('.toggle').toggles({click:false});

    </script>
@endsection
