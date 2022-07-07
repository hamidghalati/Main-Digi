@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت رنگ ها','url'=>url('admin/colors')],
    ['title'=>'ویرایش رنگ ها','url'=>url('admin/colors/'.$color->id.'/edit')]
    ]])
    <div class="panel">
        <div class="header">ویرایش رنگ : {{$color->name}}</div>
        <div class="panel_content">

            {{ Form::model($color,['url' => 'admin/colors/'.$color->id]) }}

            {{method_field('PUT')}}

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
                <button type="submit" class="btn btn-warning btn-lg "><i class="fa fa-pencil"></i>     ویرایش اطلاعات     </button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection

@section('footer')
    <script type="text/javascript" src="{{asset('js/jscolor.min.js')}}"></script>
@endsection
