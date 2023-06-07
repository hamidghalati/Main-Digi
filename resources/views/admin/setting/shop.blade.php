@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'تنظیمات فروشگاه','url'=>url('admin/setting/shop')],
       ]])
    <div class="panel">
        <div class="header">تنظیمات فروشگاه</div>
        <div class="panel_content send_order">

            {{ Form::open(['url' => 'admin/setting/shop','files'=>true]) }}
            <div class="form-group">
                {{ Form::label('shop_name', 'عنوان فروشگاه :')}}
                {{ Form::text('shop_name', config('shop-info.shop_name'),['class'=>'form-control'])}}
            </div>

            <div class="form-group">
                {{ Form::label('shop_icon', 'لوگو فروشگاه:')}}
                {{ Form::file('send_price',['class'=>'form-control left'])}}
            </div>


            <div class="form-group">
                {{ Form::label('shop_icon', 'برچسب ها:')}}

                <span>
                    <input type="text" name="tag_list" id="tag_list" class="form-control"
                           placeholder="برچسب " style="float: none!important;">
                    <div class="btn btn-success" id="add_tag" onclick="add_tag()">افزودن</div>
                </span>



                    <input type="hidden" name="keywords" value="{{config('shop-info.keywords')}}" id="keywords">



            </div>
            <div id="tag_box">
                <?php
                $keywords = config('shop-info.keywords');
                $e = explode(',', $keywords);
                $i = 1;
                ?>
                @if (is_array($e))
                    @foreach ($e as $key=>$value)
                        @if (!empty($value))
                            <div class="tag_div" id="tag_div_{{$i}}" style="margin-bottom: 30px!important;">
                                <span class="fa fa-remove" onclick="remove_tag('{{$i}}','{{$value}}')"></span>
                                {{$value}}
                            </div>
                                <?php
                                $i++;
                                ?>
                        @endif
                    @endforeach
                @endif


                <div style="clear: both"></div>


            </div>



                <div class="form-group">
{{--                    {{ Form::label('description',['style'=>'width:100%!important','placeholder'=>'توضیحات'])}}--}}
                    {{ Form::textArea('description', config('shop-info.description'),['class'=>'form-control description','placeholder'=>'توضیحات'])}}
                </div>




            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i> ثبت اطلاعات</button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection
