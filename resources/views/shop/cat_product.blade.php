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
        </div>

        <div class="col-9">
            <product-box></product-box>
        </div>

    </div>

@endsection
