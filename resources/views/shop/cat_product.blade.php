@extends('layouts.shop.shop')
@section('content')

    <div class="row" id="product_box">
        <div class="col-3">
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
                                        <?php $filter_key='attribute['.$value->id.']' ?>
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
