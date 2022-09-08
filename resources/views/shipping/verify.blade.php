@extends('layouts.order.order')
@section('content')




    <div class="container">
        <article class="card">
            <div class="card-body">
                <div class="track">
                    <div class="step active"> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">اطلاعات ارسال</span> </div>
                    <div class="step active"> <span class="icon"> <i class="fa fa-credit-card"></i> </span> <span class="text"> پرداخت</span> </div>
                    <div class="step active"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> اتمام خرید و ارسال </span> </div>
{{--                    <div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">پیگیری</span> </div>--}}
                </div>

            </div>
        </article>
    </div>

    <div class="container-fluid">
        <?php
        use Hekmatinasser\Verta\Verta;
        $v = new Verta();
        $orderStatus=\App\Order::orderStatus();
        ?>


        <div class="profile_menu">
            <span class="profile_menu_title">
                جزییات سفارش : {{ replace_number($order->order_id) }}
            </span>
            <span class="profile_menu_title" style="padding: 0 20px 0;font-size: 12px">
                تاریخ ثبت سفارش :
                {{replace_number(verta($order->created_at)->formatJalaliDatetime())}}
            </span>

            <table class="table table-bordered order_table_info">
                <tr>
                    <td>
                        تحویل گیرنده:
                        <span>{{$order->getAddress->name}}</span>
                    </td>
                    <td>
                        شماره تماس تحویل گیرنده :
                        <span>{{replace_number($order->getAddress->mobile)}}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        آدرس تحویل گیرنده:
                        <span>{{'استان '.$order->getAddress->getProvince->name.' -  شهر '.$order->getAddress->getCity->name.' - '.$order->getAddress->address}}</span>
                    </td>
                    <td>
                        تعداد مرسوله :
                        <span>{{replace_number(sizeof($order->getOrderInfo))}}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        مبلغ قابل پرداخت :
                        <span style="font-family: IRANSans">{{replace_number(number_format($order->price)).' تومان '}}</span>
                    </td>
                    <td>
                        مبلغ کل :
                        <span style="font-family: IRANSans">{{replace_number(number_format($order->total_price)).' تومان '}}</span>
                    </td>
                </tr>

            </table>

            @foreach($order->getOrderInfo as $key=>$value)
                <div class="order_info_div">
                    <div class="header">
                        {{\App\Order::getOrderStatus($value['send_status'],$orderStatus)}}
                    </div>
                </div>


                <table class="table table-bordered order_table_info">
                    <tr>
                        <td>
                            کد مرسوله :
                            <span>{{replace_number($value['id'])}}</span>
                        </td>
                        <td>
                            زمان تحویل سفارش :
                            <span>{{$value['delivery_order_interval']}}</span>
                        </td>
                    </tr>
                </table>



            @endforeach



        </div>



    </div>


@endsection
