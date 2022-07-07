@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت گارانتی ها','url'=>url('admin/warranties')],
       ['title'=>'افزودن گارانتی جدید','url'=>url('admin/warranties/create')]
       ]])
    <div class="panel">
        <div class="header">افزودن گارانتی جدید</div>
        <div class="panel_content">

            {{ Form::open(['url' => 'admin/warranties']) }}
            <div class="form-group">
                {{ Form::label('name', 'نام  گارانتی :')}}
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


