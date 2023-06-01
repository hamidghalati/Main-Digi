@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت مرسوله ها','url'=>url('admin/orders/submission')],
    ['title'=>' ثبت کالای مرجوعی','url'=>url('admin/orders/return-product/'.$orderProduct->id)]

    ]])
    <div class="panel">
        <div class="header">
            ثبت کالای مرجوعی
        </div>

        <?php

        use Hekmatinasser\Verta\Verta;

        $v = new Verta();
        $orderStatus = \App\Order::orderStatus();
        ?>

        <div class="panel_content">

            @include('include.alert')

            <form action="{{ url('admin/orders/return-product/'.$orderProduct->id) }}" method="post">
                @csrf
                <div class="return_product_box">
                    <div class="product_data">
                        <div>
                            <img src="{{ url('files/thumb/'.$orderProduct->getProduct->image_url) }}" alt="">
                        </div>

                        <div>
                            <ul>
                                <li>{{$orderProduct->getProduct->title}}</li>
                                <li>
                                    <a href="{{ url('admin/orders/'.$orderProduct->getOrder->id) }}" target="_blank">
                                        <span>شماره سفارش : </span> {{$orderProduct->getOrder->order_id}}
                                    </a>
                                </li>
                                <li>
                                    <span>فروشنده :</span> {{ $orderProduct->getSeller->brand_name }}
                                </li>
                                <li>
                                    <span>رنگ : </span> {{ $orderProduct->getColor->name }}
                                </li>
                                @if(!empty($orderProduct->getWarranty->name))
                                    <li>
                                        <span>گارانتی : </span> {{ $orderProduct->getWarranty->name }}
                                    </li>
                                @endif
                                <li>
                                    <span>قیمت فروش محصول :</span> {{ number_format($orderProduct->product_price2) }} تومان
                                </li>
                                @if($orderProduct->product_count>1)
                                    <li id="count">
                                        <span>تعداد : </span>
                                        <select name="count"  class="selectpicker auto-width-select">
                                            @for($i=1;$i<=$orderProduct->product_count;$i++)
                                                <option value="{{ $i }}">{{ $i }}</option>
                                            @endfor
                                        </select>
                                    </li>
                                @endif

                            </ul>
                        </div>

                    </div>

                    {{ Form::select('stockroom_id', $stockroom,null,['class'=>'selectpicker','data-live-search'=>'true'])}}
                    <textarea name="tozihat" id=""  placeholder="توضیحات"></textarea>

                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
                    </div>
                </div>
            </form>


        </div>
    </div>

@endsection



