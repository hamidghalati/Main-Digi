@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت رنگ ها','url'=>url('admin/colors')],
       ['title'=>'افزودن رنگ جدید','url'=>url('admin/colors/create')]
       ]])
    <div class="panel">
        <div class="header">افزودن رنگ جدید</div>
        <div class="panel_content">

            {{ Form::open(['url' => 'admin/colors']) }}
            <div class="form-group">
                {{ Form::label('name', 'نام رنگ :')}}
                {{ Form::text('name', null,['class'=>'form-control'])}}

                @if($errors->has('name'))
                    <span class="has_error">{{$errors->first('name')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('code', 'کد رنگ :')}}
                {{ Form::text('code', null,['class'=>'form-control jscolor'])}}
                @if($errors->has('code'))
                    <span class="has_error">{{$errors->first('code')}}</span>
                @endif
            </div>

            <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection

@section('footer')
    <script type="text/javascript" src="{{asset('js/jscolor.min.js')}}"></script>
@endsection
