@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت گارانتی ها','url'=>url('admin/warranties')],
    ['title'=>'ویرایش گارانتی ها','url'=>url('admin/warranties/'.$warranty->id.'/edit')]
    ]])
    <div class="panel">
        <div class="header">ویرایش گارانتی : {{$warranty->name}}</div>
        <div class="panel_content">

            {{ Form::model($warranty,['url' => 'admin/warranties/'.$warranty->id]) }}

            {{method_field('PUT')}}

            <div class="form-group">
                {{ Form::label('name', 'نام رنگ :')}}
                {{ Form::text('name', null,['class'=>'form-control'])}}

                @if($errors->has('name'))
                    <span class="has_error">{{$errors->first('name')}}</span>
                @endif
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-warning btn-lg "><i class="fa fa-pencil"></i>     ویرایش اطلاعات     </button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection


