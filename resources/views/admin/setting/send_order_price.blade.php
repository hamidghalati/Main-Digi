@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'تعیین هزینه ارسال سفارشات','url'=>url('admin/setting/send-order-price')],
       ]])
    <div class="panel">
        <div class="header">تعیین هزینه ارسال سفارشات</div>
        <div class="panel_content send_order">
            {{ Form::open(['url' => 'admin/setting/send-order-price','files'=>true]) }}
            <div class="form-group">
                {{ Form::label('send_time', 'زمان حدودی سفارش :')}}
                {{ Form::text('send_time', null,['class'=>'form-control left'])}}

                @if($errors->has('send_time'))
                    <span class="has_error">{{$errors->first('send_time')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('send_price', 'هزینه ارسال سفارش :')}}
                {{ Form::text('send_price', null,['class'=>'form-control left'])}}

                @if($errors->has('send_price'))
                    <span class="has_error">{{$errors->first('send_price')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('min_order_price', 'حداقل خرید برای ارسال رایگان :')}}
                {{ Form::text('min_order_price', null,['class'=>'form-control left'])}}

                @if($errors->has('min_order_price'))
                    <span class="has_error">{{$errors->first('min_order_price')}}</span>
                @endif
            </div>

            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection
