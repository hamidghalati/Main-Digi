@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت انبارها','url'=>url('admin/stockrooms')],
       ['title'=>'افزودن انبار جدید','url'=>url('admin/stockrooms/create')]
       ]])
    <div class="panel">
        <div class="header">افزودن انبار جدید</div>
        <div class="panel_content add_city">

            {{ Form::open(['url' => 'admin/stockrooms']) }}

            <div class="form-group">
                {{ Form::label('name', 'نام انبار :')}}
                {{ Form::text('name', null,['class'=>'form-control','placeholder'=>'نام انبار را وارد کنید'])}}

                @if($errors->has('name'))
                    <span class="has_error">{{$errors->first('name')}}</span>
                @endif
            </div>

            <div class="form-group textarea_field">
                {{ Form::label('address', 'آدرس انبار :')}}
                {{ Form::textarea('address', null,['class'=>'form-control','placeholder'=>'آدرس انبار را وارد کنید'])}}
            </div>

            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection

