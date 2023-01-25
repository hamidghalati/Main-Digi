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

            @if(isset($filter))
                @foreach($filter as $key=>$value)
                    <div class="item_box">
                        <div class="title_box">
                            <label for="">{{$value->title}}</label>
                            <span class="fa fa-angle-down"></span>
                        </div>
                        <div>
                            <div class="filter_box">
                                <ul class="list-inline product_cat_ul">
                                    @foreach($value->getChild as $key2=>$value2)
                                            <?php $filter_key = 'attribute[' . $value->id . ']' ?>
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
