@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'ویرایش تنوع قیمت ها','url'=>url('admin/Product_warranties?product_id='.$product->id)],
       ['title'=>'ویرایش تنوع قیمت ها','url'=>url('admin/Product_warranties/'.$product_warranties->id.'/edit/?product_id='.$product->id)]
       ]])
    <div class="panel">
        <div class="header">
             ویرایش تنوع قیمت :
            <p style="display: contents!important;" class="text-danger text-right">{{$product->title}}</p>
            </div>

        <div class="panel_content">

            @include('include.alert')

            {{ Form::model($product_warranties,['url' => 'admin/Product_warranties/'.$product_warranties->id.'?product_id='.$product->id]) }}
            {{method_field('PUT')}}

            <div class="form-group">
                {{ Form::label('warranty_id', ' انتخاب گارانتی :')}}
                {{ Form::select('warranty_id', $warranty,null,['class'=>'selectpicker','data-live-search'=>'true'])}}

            </div>

            <div class="form-group">
                {{ Form::label('color_id', ' انتخاب رنگ  :')}}
                <select class="selectpicker" name="color_id" data-live-search="true" >
                    @foreach($colors as $key=>$value)
                        <option @if($product_warranties->color_id==$value->getColor->id) selected="selected" @endif value="{{$value->getColor->id}}"
                                data-content=" <span class='color_option' style='Background:{{$value->getColor->code}} @if($value->name=='سفید') color:#000000 @endif'>{{$value->getColor->name}}</span>" >
                        </option>
                    @endforeach
                </select>

            </div>


            <div class="form-group">
                {{ Form::label('price1', 'قیمت محصول :')}}
                {{ Form::text('price1', null,['class'=>'form-control left price_input'])}}
                <span class="text-danger">(تومان)</span>
                @if($errors->has('price1'))
                    <span class="has_error">{{$errors->first('price1')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('price2', 'قیمت محصول(فروش) :')}}
                {{ Form::text('price2', null,['class'=>'form-control left discount_price_input'])}}
                <span class="text-danger">(تومان)</span>
                @if($errors->has('price2'))
                    <span class="has_error">{{$errors->first('price2')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('product_number', 'موجودی محصول :')}}
                {{ Form::text('product_number', null,['class'=>'form-control left product_number'])}}
                @if($errors->has('product_number'))
                    <span class="has_error">{{$errors->first('product_number')}}</span>
                @endif
            </div>


            <div class="form-group">
                {{ Form::label('product_number_cart', 'تعداد سفارش در سبد خرید :')}}
                {{ Form::text('product_number_cart', null,['class'=>'form-control left product_number_cart'])}}

                @if($errors->has('product_number_cart'))
                    <span class="has_error">{{$errors->first('product_number_cart')}}</span>
                @endif
            </div>

            <div class="form-group">
                {{ Form::label('send_time', 'زمان آماده سازی محصول :')}}
                {{ Form::text('send_time', null,['class'=>'form-control left send_time'])}}

                @if($errors->has('send_time'))
                    <span class="has_error">{{$errors->first('send_time')}}</span>
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
    var cleave1 = new Cleave('.price_input', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });
    var cleave2 = new Cleave('.discount_price_input', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });
    var cleave3 = new Cleave('.product_number', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });
    var cleave4 = new Cleave('.product_number_cart', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });
    var cleave5 = new Cleave('.send_time', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });
</script>
@endsection
