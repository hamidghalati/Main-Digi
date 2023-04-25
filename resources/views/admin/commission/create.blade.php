@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت کمیسیون ها','url'=>url('admin/commissions')],
       ['title'=>'افزودن کمیسیون','url'=>url('admin/commissions/create')]
       ]])
    <div class="panel">
        <div class="header">افزودن کمیسیون</div>
        <div class="panel_content">

            @include('include.alert')

            {{ Form::open(['url' => 'admin/commissions']) }}


            <div class="form-group">
                {{ Form::label('cat_id', ' دسته محصولات :')}}
                {{ Form::select('cat_id', $category,null,['class'=>'selectpicker auto-width-select','data-live-search'=>'true'])}}

                @if($errors->has('cat_id'))
                    <span class="has_error">{{$errors->first('cat_id')}}</span>
                @endif
            </div>


            <div class="form-group">
                {{ Form::label('brand_id', ' انتخاب برند :')}}
                {{ Form::select('brand_id', $brand,null,['class'=>'selectpicker auto-width-select','data-live-search'=>'true'])}}

                @if($errors->has('brand_id'))
                    <span class="has_error">{{$errors->first('brand_id')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('percentage', 'درصد کمیسیون :')}}
                {{ Form::text('percentage', null,['class'=>'form-control left'])}}

                @if($errors->has('percentage'))
                    <span class="has_error">{{$errors->first('percentage')}}</span>
                @endif
            </div>

            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection

