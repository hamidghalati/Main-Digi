@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت شهر ها','url'=>url('admin/city')],
       ['title'=>'ویرایش شهر ','url'=>url('admin/city/edit'.$city->id.'/edit')]
       ]])
    <div class="panel">
        <div class="header"> ویرایش شهر : {{$city->name}}</div>
        <div class="panel_content add_city">

            {{ Form::model($city,['url' => 'admin/city/'.$city->id]) }}
            {{method_field('PUT')}}
            <div class="form-group">
                {{ Form::label('name', 'نام شهر :')}}
                {{ Form::text('name', null,['class'=>'form-control'])}}

                @if($errors->has('name'))
                    <span class="has_error">{{$errors->first('name')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('province_id', ' انتخاب استان :')}}
                {{ Form::select('province_id', $province,null,['class'=>'selectpicker','data-live-search'=>'true'])}}

            </div>

            <p style="color:red;font-size: 13px ">ثبت اطلاعات ارسال سفارشات به این شهر (در صورت نیاز)</p>

            <div class="form-group">
                {{ Form::label('send_time', 'زمان حدودی سفارش :')}}
                {{ Form::text('send_time', null,['class'=>'form-control left'])}}

                @if($errors->has('send_time'))
                    <span class="has_error">{{$errors->first('send_time')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('send_price', 'هزینه ارسال سفارش (تومان):')}}
                {{ Form::text('send_price', null,['class'=>'form-control left'])}}

                @if($errors->has('send_price'))
                    <span class="has_error">{{$errors->first('send_price')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('min_order_price', 'حداقل خرید برای ارسال رایگان (تومان):')}}
                {{ Form::text('min_order_price', null,['class'=>'form-control left'])}}

                @if($errors->has('min_order_price'))
                    <span class="has_error">{{$errors->first('min_order_price')}}</span>
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

    <script type="text/javascript" src="{{asset('js/cleave.min.js')}}"></script>

    <script>
        var cleave1 = new Cleave('#send_time', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var cleave2 = new Cleave('#send_price', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var cleave3 = new Cleave('#min_order_price', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });

    </script>
@endsection
