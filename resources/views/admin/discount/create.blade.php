@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت کدهای تخفیف','url'=>url('admin/discount')],
       ['title'=>'افزودن کد تخفیف','url'=>url('admin/discount/create')]
       ]])
    <div class="panel">
        <div class="header">
            افزودن کد تخفیف

        </div>

        <div class="panel_content" id="discount_code">

            @include('include.alert')

            {{ Form::open(['url' => 'admin/discount']) }}

            <div class="form-group">
                {{ Form::label('code', 'کد تخفیف :')}}
                {{ Form::text('code', null,['class'=>'form-control left'])}}
                @if($errors->has('code'))
                    <span class="has_error">{{$errors->first('code')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('expire_time', 'تاریخ انقضا :')}}
                {{ Form::text('expire_time', null,['class'=>'form-control text-center','id'=>'expire_time'])}}
                @if($errors->has('expire_time'))
                    <span class="has_error">{{$errors->first('expire_time')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('cat_id', ' انتخاب گروه محصولات :')}}
                {{ Form::select('cat_id', $cat,null,['class'=>'selectpicker','data-live-search'=>'true'])}}

            </div>




            <div class="form-group">
                {{ Form::label('amount', 'حداقل خرید :')}}
                {{ Form::text('amount', null,['class'=>'form-control left amount'])}}
{{--                <span class="text-danger">(تومان)</span>--}}
                @if($errors->has('amount'))
                    <span class="has_error">{{$errors->first('amount')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('number_usable', 'حداکثر دفعات استفاده از کد تخفیف :')}}
                {{ Form::text('number_usable', null,['class'=>'form-control left number_usable'])}}
                @if($errors->has('number_usable'))
                    <span class="has_error">{{$errors->first('number_usable')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('amount_discount', 'میزان کد تخفیف(بر حسب تومان) :')}}
                {{ Form::text('amount_discount', null,['class'=>'form-control left amount_discount'])}}
{{--                <span class="text-danger">(تومان)</span>--}}
                @if($errors->has('amount_discount'))
                    <span class="has_error">{{$errors->first('amount_discount')}}</span>
                @endif
            </div>


            <div class="form-group">
                {{ Form::label('amount_percent', 'میزان کد تخفیف(بر حسب درصد) :')}}
                {{ Form::text('amount_percent', null,['class'=>'form-control left amount_percent'])}}
{{--                <span class="text-danger">(%)</span>--}}
                @if($errors->has('amount_percent'))
                    <span class="has_error">{{$errors->first('amount_percent')}}</span>
                @endif
            </div>

            <div class="form-group">
                <label for="">استفاده برای پیشنهادات شگفت انگیز</label>
{{--                <input type="checkbox" name="incredible_offers">--}}

                <div class="pretty p-icon p-smooth">
                    <input type="checkbox" name="incredible_offers" class="check_box" />
                    <div class="state p-success-o">
                        <i class="icon mdi mdi-close-outline"></i>
                        <label></label>
                    </div>
                </div>

            </div>



            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
            </div>
            {{ Form::close() }}

        </div>
    </div>
@endsection


@section('header')
    <link rel="stylesheet" href="{{asset('css/jspc-gray.css')}}">
@endsection

@section('footer')
    <script type="text/javascript" src="{{asset('js/js-persian-cal.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/cleave.min.js')}}"></script>

    <script>
        const expire_time=new AMIB.persianCalendar('expire_time');
        var cleave1 = new Cleave('.amount', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var cleave2 = new Cleave('.number_usable', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var cleave3 = new Cleave('.amount_discount', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var cleave4 = new Cleave('.amount_percent', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });

    </script>
@endsection


{{--@section('footer')--}}



{{--    <script>--}}
{{--       --}}
{{--        var cleave2 = new Cleave('.discount_price_input', {--}}
{{--            numeral: true,--}}
{{--            numeralThousandsGroupStyle: 'thousand'--}}
{{--        });--}}
{{--        var cleave3 = new Cleave('.product_number', {--}}
{{--            numeral: true,--}}
{{--            numeralThousandsGroupStyle: 'thousand'--}}
{{--        });--}}
{{--        var cleave4 = new Cleave('.product_number_cart', {--}}
{{--            numeral: true,--}}
{{--            numeralThousandsGroupStyle: 'thousand'--}}
{{--        });--}}
{{--        var cleave5 = new Cleave('.send_time', {--}}
{{--            numeral: true,--}}
{{--            numeralThousandsGroupStyle: 'thousand'--}}
{{--        });--}}
{{--    </script>--}}
{{--@endsection--}}

