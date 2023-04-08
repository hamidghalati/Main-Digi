@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت انبارها','url'=>url('admin/stockrooms')],
       ['title'=>'ویرایش انبار ','url'=>url('admin/stockrooms/'.$stockroom->id.'/edit')]
       ]])
    <div class="panel">
        <div class="header">
            ویرایش انبار : {{ $stockroom->name }}
        </div>
        <div class="panel_content add_city">

            {{ Form::model($stockroom,['url' => 'admin/stockrooms/'.$stockroom->id]) }}
            {{method_field('PUT')}}

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
                <button type="submit" class="btn btn-warning btn-lg "><i class="fa fa-pencil"></i>     ویرایش اطلاعات     </button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection

