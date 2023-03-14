@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت نقش کاربری','url'=>url('admin/userRole')],
       ['title'=>'افزودن نقش کاربری جدید','url'=>url('admin/userRole/create')]
       ]])
    <div class="panel">
        <div class="header">افزودن نقش کاربری جدید</div>
        <div class="panel_content">

            {{ Form::open(['url' => 'admin/userRole','files'=>true]) }}
            <div class="form-group">
                {{ Form::label('name', 'نام نقش کاربری :')}}
                {{ Form::text('name', null,['class'=>'form-control'])}}

                @if($errors->has('name'))
                    <span class="has_error">{{$errors->first('name')}}</span>
                @endif
            </div>

            <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection
