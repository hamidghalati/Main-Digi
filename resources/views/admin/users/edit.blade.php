@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت کاربران','url'=>url('admin/users')],
       ['title'=>'ویرایش اطلاعات کاربر ','url'=>url('admin/users/'.$user->id.'/edit')]
       ]])
    <div class="panel">
        <div class="header"> ویرایش کاربر :
            @if($user->name==null)
                {{$user->mobile}}
            @else
                {{$user->name}}
            @endif
        </div>
        <div class="panel_content" id="user_div">

            {{ Form::model($user,['url' => 'admin/users/'.$user->id]) }}
            {{method_field('PUT')}}
            <div class="form-group">
                {{ Form::label('name', 'نام و نام خانوادگی :')}}
                {{ Form::text('name', null,['class'=>'form-control'])}}

                @if($errors->has('name'))
                    <span class="has_error">{{$errors->first('name')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('username', 'نام کاربری(برای نقش مدیر) :')}}
                {{ Form::text('username', null,['class'=>'form-control'])}}
                @if($errors->has('username'))
                    <span class="has_error">{{$errors->first('username')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('mobile', 'شماره موبایل:')}}
                {{ Form::text('mobile', null,['class'=>'form-control'])}}
                @if($errors->has('mobile'))
                    <span class="has_error">{{$errors->first('mobile')}}</span>
                @endif
            </div>
            <div class="form-group">
                {{ Form::label('password', 'کلمه عبور:')}}
                {{ Form::password('password',['class'=>'form-control'])}}
                @if($errors->has('password'))
                    <span class="has_error">{{$errors->first('password')}}</span>
                @endif
            </div>

{{--            <div class="form-group">--}}
{{--                {{ Form::label('account_status', ' وضعیت اکانت کاربری :')}}--}}
{{--                <select name="account_status" class="selectpicker">--}}
{{--                    <option @if($user->account_status=='active') selected="selected" @endif value="active">فعال</option>--}}
{{--                    <option @if($user->account_status=='Inactive') selected="selected" @endif value="inactive">غیرفعال</option>--}}
{{--                </select>--}}
{{--            </div>--}}

            <div class="form-group">
                {{ Form::label('account_status', '  وضعیت اکانت کاربری :')}}
                {{ Form::select('account_status',['active'=>'فعال','Inactive'=>'غیرفعال'],null,['class'=>'selectpicker'])}}
            </div>

            <div class="form-group">
                {{ Form::label('role', ' نقش کاربری :')}}
                {{ Form::select('role',$roles,null,['class'=>'selectpicker'])}}
            </div>

{{--            <div class="form-group">--}}
{{--                {{ Form::label('role', ' نقش کاربری :')}}--}}
{{--                <select name="role" class="selectpicker">--}}
{{--                    <option @if($user->role=='admin') selected="selected" @endif value="admin">مدیر</option>--}}
{{--                    <option @if($user->role=='user') selected="selected" @endif value="user">کاربر عادی</option>--}}
{{--                    @foreach($roles  as $role)--}}
{{--                        <option @if($user->role==$role->id) selected="selected" @endif value="{{ $role->id }}">{{ $role->name }}</option>--}}
{{--                    @endforeach--}}

{{--                </select>--}}
{{--            </div>--}}




            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-warning btn-lg "><i class="fa fa-pencil"></i>     ویرایش اطلاعات     </button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection

