@extends('layouts.shop.shop')
@section('content')

    <div class="row" id="product_box">
        <div class="col-3">


            @if(isset($brands))
                <div class="item_box">
                    <div class="title_box">
                        <label for="">برند</label>
                        <span class="fa fa-angle-down"></span>
                    </div>
                    <div>
                        <div class="filter_box" style="display: block">
                            <ul class="list-inline product_cat_ul">
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

                <div class="item_box">
                    <div class="title_box">
                        <label for="">  جستجو در نتایج :</label>
                        <span class="fa fa-angle-down"></span>
                    </div>
                    <div>
                        <input type="text" @if(array_key_exists('string',$_GET))
                            value="{{ $_GET['string'] }}" @endif id="search_input" placeholder="نام محصول یا برند مورد نظر خود را وارد نمایید">
                    </div>
                </div>

            @if(sizeof($colors)>1)
                <div class="item_box">
                    <div class="title_box">
                        <label for="">رنگ ها</label>
                        <span class="fa fa-angle-down"></span>
                    </div>
                    <div>
                        <div class="filter_box" style="display: block">
                            <ul class="list-inline product_cat_ul color_filter_ul">
                                @foreach($colors as $key=>$value)

                                    <li data="color_param_{{$value->id}}">
                                        <div>
                                            <span class="check_box"></span>
                                            <span class="title">{{$value->name}}</span>

                                        </div>
                                        <div>
                                            <div style="background:<?= $value->code; ?> @if($value->name=='سفید') border:1px solid black @endif  " class="color_div"></div>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            @endif

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

        <div class="col-9">
            <product-box></product-box>
        </div>

    </div>

@endsection
@section('header')
    <link rel="stylesheet" href="{{asset('css/nouislider.min.css')}}">
    <script type="text/javascript" src="{{asset('js/nouislider.min.js')}}"></script>

@endsection
@section('footer')

@endsection
