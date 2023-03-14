@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت نقش کاربری','url'=>url('admin/userRole')],
       ['title'=>'ویرایش نقش کاربری','url'=>url('admin/userRole/'.$userRole->id.'/edit')]
       ]])
    <div class="panel">
        <div class="header">
            ویرایش نقش کاربری  : {{$userRole->name}}
        </div>
        <div class="panel_content">

            {{ Form::model($userRole,['url' => 'admin/userRole/'.$userRole->id,'files'=>true]) }}
            {{method_field('PUT')}}

            <div class="form-group">
                {{ Form::label('name', 'نام نقش کاربری :')}}
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
