@extends('layouts.shop.shop')
@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('include.user_panel_menu',['active'=>'gift-cart'])
        </div>


        <div class="col-md-9" style="padding: 0">
            <div class="profile_menu">
                <span class="profile_menu_title">کارت های هدیه من</span>
                <?php $jdf = new \App\Lib\jdf() ?>
                <table class="table table-striped product_list_table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>کد کارت</th>
                        <th>اعتبار کارت هدیه</th>
                        <th>اعتبار مصرف شده</th>
                        <th>تاریخ ثبت</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($gift_cart as $key=>$value)
                            <?php
                            $e = explode(' ', $value->created_at);
                            $date = explode('-', $e[0]);
                            ?>
                        <tr>
                            <td>{{replace_number(++$key)}}</td>
                            <td>{{$value->code}}</td>
                            <td style="font-family: 'IRANSans';font-size: 13px;">{{replace_number(number_format($value->credit_cart))}}
                                تومان
                            </td>
                            <td style="font-family: 'IRANSans';font-size: 13px;">{{replace_number(number_format($value->credit_used))}}
                                تومان
                            </td>
                            <td>{{replace_number($jdf->gregorian_to_jalali($date[0],$date[1],$date[2],'-'))}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                {{$gift_cart->links()}}
            </div>
        </div>
    </div>
@endsection

