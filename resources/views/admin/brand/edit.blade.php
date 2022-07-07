@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت برندها','url'=>url('admin/brands')],
       ['title'=>'ویرایش برند جدید','url'=>url('admin/brands/'.$brand->id.'/edit')]
       ]])
    <div class="panel">
        <div class="header">
            ویرایش برند  : {{$brand->brand_name}}
        </div>
        <div class="panel_content">

            {{ Form::model($brand,['url' => 'admin/brands/'.$brand->id,'files'=>true]) }}
            {{method_field('PUT')}}

            <div class="form-group">
                {{ Form::label('brand_name', 'نام برند :')}}
                {{ Form::text('brand_name', null,['class'=>'form-control'])}}

                @if($errors->has('brand_name'))
                    <span class="has_error">{{$errors->first('brand_name')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('brand_ename', 'نام انگلیسی برند :')}}
                {{ Form::text('brand_ename', null,['class'=>'form-control'])}}
                @if($errors->has('brand_ename'))
                    <span class="has_error">{{$errors->first('brand_ename')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('description', 'توضیحات :')}}
                {{ Form::textArea('description', null,['class'=>'form-control brand_tozihat'])}}

            </div>


            <div class="form-group">

                <input type="file" name="pic" id="pic" onchange="loadFile(event)" style="display: none">
                <span onclick="select_file()" class="btn btn-primary">انتخاب آیکن برند</span>
                @if($errors->has('pic'))
                    <span class="has_error">{{$errors->first('pic')}}</span>
                @endif
            </div>

            <div class="form-group">
                <img @if(!empty($brand->brand_icon)) src="{{url('files/upload/'.$brand->brand_icon)}}" @endif  width="100px" height="100px" id="output">
            </div>



            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-warning btn-lg "><i class="fa fa-pencil"></i>     ویرایش اطلاعات     </button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection
