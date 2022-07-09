@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت  محصولات','url'=>url('admin/products')],
    ['title'=>'  ثبت مشخصات فنی','url'=>url('admin/products/'. $product->id .'/items')],

    ]])
    <div class="panel">
        <div class="header">
            افزودن مشخصات فنی :
            <p style="display: contents!important;" class="text-danger text-right">{{$product->title}}</p>

        </div>
        <div class="panel_content">
            @include('include.alert')

          @if(sizeof($product_items)>0)
                <form method="post" action="{{url('admin/products/'. $product->id .'/items')}}">
                        @csrf
                    @foreach($product_items as $key=>$value)
                        <div class="item_group" style="margin-bottom: 20px">
                            <span class="title main-title"> <i class="fa fa-caret-left icon_title" ></i>  {{$value->title}} </span>
                            @foreach($value->getChild as $key2=>$value2)
                                <div class="form-group" style="margin-top: 25px;">
                                    <label>{{$value2->title}} :</label>
                                    @if(sizeof($value2->getValue)>0)
                                        <input type="text" name="item_value[{{$value2->id}}][]" value="{{$value2->getValue[0]->item_value}}" class="form-control child_input_item" placeholder=" مشخصات را وارد نمایید...">
                                    @else
                                        <input type="text" name="item_value[{{$value2->id}}][]" value="" class="form-control child_input_item" placeholder=" مشخصات را وارد نمایید...">
                                    @endif
                                    <span class="fa fa-plus-square" onclick="add_item_value_item({{$value2->id}})"></span>
                                    <div class="input_item_box" id="input_item_box_{{$value2->id}}"></div>
                                    @if(sizeof($value2->getValue)>1)
                                        @foreach($value2->getValue as $item_key=>$item_value)
                                            @if($item_key>0)
                                                <div class="form-group">
                                                    <label></label>
                                                    <input name="item_value[{{$value2->id}}][]" value="{{$item_value->item_value}}" type="text" class="form-control input_value_item" placeholder=" مشخصات را وارد نمایید...">
                                                </div>
                                            @endif
                                        @endforeach
                                    @endif
                                </div>
                            @endforeach
                        </div>
                    @endforeach
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
                    </div>
                </form>
            @else
            @endif






        </div>
    </div>

    @include('include.alert')











@endsection
