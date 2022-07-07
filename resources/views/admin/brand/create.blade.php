@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت برندها','url'=>url('admin/brands')],
       ['title'=>'افزودن برند جدید','url'=>url('admin/brands/create')]
       ]])
    <div class="panel">
        <div class="header">افزودن برند جدید</div>
        <div class="panel_content">

            {{ Form::open(['url' => 'admin/brands','files'=>true]) }}
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
                <img src="{{url('files/images/pic_3.jpg')}}" width="100px" height="100px" id="output">
            </div>



            <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection
