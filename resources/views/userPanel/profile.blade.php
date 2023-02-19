@extends('layouts.shop.shop')
@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('include.user_panel_menu',['active'=>'profile'])
        </div>
        <div class="col-md-9" style="padding: 0">
            <div class="profile_menu" >
                <span class="profile_menu_title">اطلاعات شخصی</span>
                <table class="table table-bordered order_table_info" style="margin: 20px auto!important;">
                    <tr>
                        <td>
                            نام و نام خانوادگی :
                            <span>{{ getUserPersonalData($additionalInfo,'first_name','last_name') }}</span>
                        </td>
                        <td>
                            پست الکترونیک :
                            <span>{{ getUserPersonalData($additionalInfo,'email') }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            شماره تلفن همراه :
                            <span>{{ Auth::user()->mobile }}</span>
                        </td>
                        <td>
                            کد ملی :
                            <span>{{ getUserPersonalData($additionalInfo,'national_identity_number') }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            دریافت خبرنامه :
                            <span>
                                @if(getUserPersonalData($additionalInfo,'newsletter')=='yes')
                                    بلی
                                @else
                                    خیر
                                @endif
                            </span>
                        </td>
                        <td>
                            شماره کارت بانک :
                            <span>{{ getUserPersonalData($additionalInfo,'bank_card_number') }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span  style="text-align: center">
                                <a class="data_link" href="{{ url('user/profile/additional-info') }}">
                                    <i class="fa fa-pencil"></i>
                                    ویرایش
                                </a>
                            </span>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="profile_menu">
                <span class="profile_menu_title">آخرین سفارشات من</span>
                @include('include.user_order_list')
            </div>

        </div>
    </div>
@endsection
