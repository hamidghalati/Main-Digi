@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت نقد و بررسی ها ','url'=>url('admin/product/review?product_id='.$product->id)],
       ['title'=>'افزودن نقد و بررسی','url'=>url('admin/product/review/create/?product_id='.$product->id)]
       ]])

    <div class="panel">
        <div class="header" style="justify-content: unset!important;">افزودن نقد و بررسی جدید برای :
            <span class="text-danger" style="margin-right: 5px">{{ $product->title }}</span>
        </div>

        <div class="panel_content">

            {{ Form::open(['url' => 'admin/product/review?product_id='.$product->id]) }}

            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        {{ Form::label('title', 'عنوان  :')}}
                        {{ Form::text('title', null,['class'=>'form-control total_width_input','style'=>'width:100%'])}}

                        @if($errors->has('title'))
                            <span class="has_error">{{$errors->first('title')}}</span>
                        @endif
                    </div>

                </div>

            </div>

            <div class="form-group">
                {{ Form::label('tozihat', 'توضیحات :',['id'=>'tozihat'])}}
                {{ Form::textArea('tozihat', null,['class'=>'form-control total_width_input ckeditor'])}}

                @if($errors->has('tozihat'))
                    <span class="has_error">{{$errors->first('tozihat')}}</span>
                @endif

            </div>

            <div class="col-md-12">
                <div class="form-group">
                    <div class="d-grid gap-2 col-6 mx-auto" style="text-align: center!important;">
                        <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-pencil"></i>     ثبت اطلاعات     </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

@endsection
@section('footer')
    <script src="{{ asset('ckeditor/ckeditor.js') }}" defer></script>
@endsection
