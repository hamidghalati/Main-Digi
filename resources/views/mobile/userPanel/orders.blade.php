@extends('layouts.mobile.mobile')
@section('content')
    <?php use App\Lib\jdf;

    $jdf = new jdf(); ?>
    <div class="order_list">
        <span class="profile_menu_title">سفارشات من</span>
        @foreach($orders as $key=>$value)

            <div class="profile_item">
                <div class="profile_item_header">
                    <div>
                        {{replace_number($value->order_id)}} |
                        @if($value['pay_status']=='awaiting_payment')
                            در انتظار پرداخت
                        @elseif($value['pay_status']=='ok')
                            پرداخت شده
                        @elseif($value['pay_status']=='canceled')
                            لغو شده
                        @else
                            خطا در پرداخت
                        @endif
                    </div>
                    <a href="{{ url('user/profile/orders/'.$value->id) }}">
                        <i class="fa fa-angle-left"></i>
                    </a>
                </div>
                <div class="profile_info_row">
                    <span>تاریخ ثبت سفارش</span>
                    <span>{{replace_number(verta($value->created_at)->format('j F Y '))}}</span>
                </div>
                <div class="profile_info_row">
                    <span>مبلغ قابل پرداخت</span>
                    <span>{{replace_number(number_format($value->price))}} تومان</span>
                </div>
                <div class="profile_info_row">
                    <span>مبلغ کل</span>
                    <span>{{replace_number(number_format($value->total_price))}} تومان</span>
                </div>

            </div>

        @endforeach

        {{$orders->links()}}

    </div>

@endsection
