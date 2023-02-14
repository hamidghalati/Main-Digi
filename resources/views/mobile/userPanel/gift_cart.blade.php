@extends('layouts.mobile.mobile')
@section('content')
    <?php $jdf = new \App\Lib\jdf() ?>



    <div>
        <div class="profile_item_header order_content_header">
            <div>
                <span>کارت های هدیه</span>
            </div>
            <a href="{{ url('user/profile') }}">
                <span>بازگشت</span>
                <i class="fa fa-angle-left"></i>
            </a>
        </div>

        @foreach($gift_cart as $key=>$value)
                <?php
                $e = explode(' ', $value->created_at);
                $date = explode('-', $e[0]);
                ?>

            <div class="profile_item">
                <div class="profile_info_row remove_border">
                    <span>کد کارت :</span>
                    <span>{{$value->code}}</span>
                </div>
                <div class="profile_info_row remove_border">
                    <span>اعتبار کارت هدیه :</span>
                    <span>{{replace_number(number_format($value->credit_cart))}} تومان</span>
                </div>
                <div class="profile_info_row remove_border">
                    <span>اعتبار مصرف شده :</span>
                    <span>{{replace_number(number_format($value->credit_used))}} تومان</span>
                </div>
                <div class="profile_info_row remove_border">
                    <span>تاریخ ثبت :</span>
                    <span>{{replace_number($jdf->gregorian_to_jalali($date[0],$date[1],$date[2],'/'))}}</span>
                </div>
            </div>

        @endforeach
        {{$gift_cart->links()}}


    </div>



@endsection
