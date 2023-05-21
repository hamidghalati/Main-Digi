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

            <form action="{{ url('admin/orders/return-product/'.$orderProduct->id) }}" method="post">
                @csrf
                <div class="return_product_box">
                    <div class="product_data">
                        <div>
                            <img src="{{ url('files/thumb/'.$orderProduct->getProduct->image_url) }}" alt="">
                        </div>
                    </div>
                </div>
            </form>


        </div>
    </div>

@endsection



