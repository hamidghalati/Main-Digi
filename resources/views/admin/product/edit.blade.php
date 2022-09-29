@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت محصولات ','url'=>url('admin/products')],
       ['title'=>'ویرایش محصول ','url'=>url('admin/products/'.$product->id.'/edit')]
       ]])

    <?php
        $status=\App\ProductsModel::ProductStatus();
    ?>


    <div class="panel">
        <div class="header">ویرایش محصول جدید</div>
        <div class="panel_content">

            {{ Form::model($product,['url' => 'admin/products/'.$product->id,'files'=>true]) }}
            {{method_field('PUT')}}


            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        {{ Form::label('title', 'عنوان محصول :')}}
                        {{ Form::text('title', null,['class'=>'form-control total_width_input'])}}

                        @if($errors->has('title'))
                            <span class="has_error">{{$errors->first('title')}}</span>
                        @endif
                    </div>
                    <div class="form-group">
                        {{ Form::label('ename', 'نام لاتین محصول :')}}
                        {{ Form::text('ename', null,['class'=>'form-control left'])}}
                    </div>
                    <div class="form-group">
                        {{ Form::label('cat_id', 'انتخاب دسته محصولات :')}}
                        {{ Form::select('cat_id', $catList,null,['class'=>'selectpicker','data-live-search'=>'true'])}}

                        @if($errors->has('cat_id'))
                            <span class="has_error">{{$errors->first('cat_id')}}</span>
                        @endif
                    </div>
                    <div class="form-group">
                        {{ Form::label('brand_id', ' انتخاب برند :')}}
                        {{ Form::select('brand_id', $brand,null,['class'=>'selectpicker','data-live-search'=>'true'])}}
                        @if($errors->has('brand_id'))
                            <span class="has_error">{{$errors->first('brand_id')}}</span>
                        @endif
                    </div>
                    <div class="form-group">
                        {{ Form::label('color_id', ' انتخاب رنگ های محصول :')}}
                        <select class="selectpicker" name="product_color[]" data-live-search="true" multiple="multiple">
                            @foreach($colors as $key=>$value)
                                <option @if(array_key_exists($value->id,$product_color)) selected="selected" @endif value="{{$value->id}}"
                                        data-content=" <span class='color_option' style=' @if($value->name=='سفید') color:#000000 @else color:{{$value->code}} @endif'>{{$value->name}}</span>" >
                                </option>
                            @endforeach
                        </select>

                    </div>

                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="file" name="pic" id="pic" onchange="loadFile(event)"  style="display: none">
                        <div class="choice_pic_box" onclick="select_file()">
                            <span class="title">انتخاب تصویر محصول </span>
                            <img src="{{url('files/products/'.$product->image_url)}}"  id="output"  class="pic_tag" alt="">
                        </div>
                        @if($errors->has('pic'))
                            <span class="has_error">{{$errors->first('pic')}}</span>
                        @endif
                    </div>
                </div>
            </div>
            <div class="form-group">
                {{ Form::label('tozihat', 'توضیحات :')}}
                {{ Form::textArea('tozihat', null,['class'=>'form-control total_width_input ckeditor'])}}

            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        {{ Form::label('status', ' وضعیت محصول :')}}
                        {{ Form::select('status', $status,null,['class'=>'selectpicker','data-live-search'=>'true'])}}

                    </div>

                </div>
                <div class="col-md-6">
                    <div class="form-group">

                        <input type="text" name="tag_list"  id="tag_list" class="form-control" placeholder="برچسب های محصول">
                        <div class="btn btn-success" id="add_tag" onclick="add_tag()">افزودن</div>

                        <input type="hidden" name="keywords" value="{{$product->keywords}}" id="keywords">
                    </div>
                    <div id="tag_box">
                        <?php
                        $keywords=$product->keywords;
                        $e=explode(',',$keywords);
                        $i=1;
                        ?>
                        @if (is_array($e))
                                @foreach ($e as $key=>$value)
                                    @if (!empty($value))
                                        <div class="tag_div" id="tag_div_{{$i}}">
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
            </div>

            <div class="col-md-12">
                <div class="form-group">
                    {{ Form::label('description', 'توضیحات مختصر محصول(حداکثر 150 کاراکتر) :',['style'=>'width:100%!important'])}}
                    {{ Form::textArea('description', null,['class'=>'form-control description'])}}

                    @if($errors->has('description'))
                        <span class="has_error">{{$errors->first('description')}}</span>
                    @endif
                </div>

            </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label>استفاده به عنوان کارت هدیه</label>
                        <div class="pretty p-icon p-curve p-tada p-bigger">
                            <input type="checkbox" @if($product->use_for_gift_cart=='yes') checked="checked" @endif value="yes" name="use_for_gift_cart" id="use_for_gift_cart" />
                            <div class="state p-success-o">
                                <i class="icon mdi mdi-close-outline"></i>
                                <label></label>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="col-md-12">
                    <div class="form-group">
                        <div class="d-grid gap-2 col-6 mx-auto" style="text-align: center!important;">
                            <button type="submit" class="btn btn-warning btn-lg "><i class="fa fa-pencil"></i>     ویرایش اطلاعات     </button>
                        </div>
                    </div>
                </div>

        </div>
    </div>



@endsection

@section('footer')
    <script src="{{ asset('ckeditor/ckeditor.js') }}" defer></script>
@endsection
