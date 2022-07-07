@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت گروه محصولات','url'=>url('admin/category')],
       ['title'=>'افزودن گروه محصولات','url'=>url('admin/category/create')]
       ]])
    <div class="panel">
        <div class="header">افزودن دسته جدید</div>
        <div class="panel_content">

            {{ Form::open(['url' => 'admin/category','files'=>true]) }}
            <div class="form-group">
                {{ Form::label('name', 'نام دسته :')}}
                {{ Form::text('name', null,['class'=>'form-control'])}}

                @if($errors->has('name'))
                    <span class="has_error">{{$errors->first('name')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('ename', 'نام انگلیسی دسته :')}}
                {{ Form::text('ename', null,['class'=>'form-control'])}}
                @if($errors->has('ename'))
                    <span class="has_error">{{$errors->first('ename')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('search_url', 'url دسته :')}}
                {{ Form::text('search_url', null,['class'=>'form-control'])}}
                @if($errors->has('search_url'))
                    <span class="has_error">{{$errors->first('search_url')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('parent_id', ' دسته محصولات :')}}
                {{ Form::select('parent_id', $parent_cat,null,['class'=>'selectpicker','data-live-search'=>'true'])}}

            </div>

            <div class="form-group">
                {{ Form::label('pic', 'انتخاب عکس :')}}
                <input type="file" name="pic" id="pic" onchange="loadFile(event)" style="display: none">
                <img src="{{url('files/images/pic_1.jpg')}}" onclick="select_file()" width="250ox" id="output">
                @if($errors->has('pic'))
                    <span class="has_error">{{$errors->first('pic')}}</span>
                @endif
            </div>

            <div class="form-group checkbox-xl">
                {{ Form::label('notShow', 'عدم نمایش در لیست اصلی :')}}
                <div class="pretty p-icon p-curve p-tada">
                    <input type="checkbox" name="notShow">
                    <div class="state p-primary-o">
                        <i class="icon mdi mdi-check"></i>
                        <label></label>
                    </div>
                </div>
{{--                {{ Form::checkbox('notShow',false)}}--}}
            </div>

            <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection
