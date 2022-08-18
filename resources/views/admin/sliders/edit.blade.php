@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت اسلایدرها','url'=>url('admin/sliders')],
       ['title'=>'ویرایش اسلایدر ','url'=>url('admin/sliders/'.$sliders->id.'/edit')]
       ]])
    <div class="panel">
        <div class="header">
            ویرایش اسلایدر:
            <p style="display: contents!important;" class="text-danger text-right">{{$sliders->title}}</p>
        </div>
        <div class="panel_content">

            {{ Form::model($sliders,['url' => 'admin/sliders/'.$sliders->id,'files'=>true]) }}
            {{method_field('PUT')}}

            <div class="form-group">
                {{ Form::label('title', 'عنوان :')}}
                {{ Form::text('title', null,['class'=>'form-control'])}}

                @if($errors->has('title'))
                    <span class="has_error">{{$errors->first('title')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('link', 'لینک :')}}
                {{ Form::text('link', null,['class'=>'form-control left'])}}
                @if($errors->has('link'))
                    <span class="has_error">{{$errors->first('link')}}</span>
                @endif
            </div>




            <div class="form-group">
                <input type="file" name="pic" id="pic" onchange="loadFile(event)" style="display: none">
                <span onclick="select_file()" class="btn btn-primary"><i class="fa fa-image fa-2x" aria-hidden="true"></i>  انتخاب تصویر </span>
                <img   style="max-width: 100%" id="output"  @if($sliders->image_url != null) src="{{url('files/slider/'.$sliders->image_url)}}" @else src="{{url('files/images/pic_3.jpg')}}" @endif>
                @if($errors->has('pic'))
                    <span class="has_error">{{$errors->first('pic')}}</span>
                @endif
            </div>

            <div class="form-group">
                <input type="file" name="mobile_pic" id="mobile_pic" onchange="loadFile2(event)" style="display: none">
                <span onclick="select_file2()" class="btn btn-primary "><i class="fa fa-file-image fa-2x" aria-hidden="true"></i>    انتخاب تصویر  (موبایل)</span>
                <img  @if($sliders->mobile_image_url != null) src="{{url('files/slider/'.$sliders->mobile_image_url)}}" @else src="{{url('files/images/pic_3.jpg')}}" @endif style="max-width: 100%" id="output2">
                @if($errors->has('mobile_pic'))
                    <span class="has_error">{{$errors->first('mobile_pic')}}</span>
                @endif
            </div>




            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-warning btn-lg "><i class="fa fa-pencil"></i>     ویرایش اطلاعات     </button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection
