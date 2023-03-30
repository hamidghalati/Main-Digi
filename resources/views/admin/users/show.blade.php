@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت  کاربران','url'=>url('admin/users')],
    ['title'=>'مشخصات کاربر: '.$user->mobile,'url'=>url('admin/users/'.$user->id)]
    ]])
    <div class="panel">
        <div class="header">
           <div>
               <span>مشخصات کاربر :</span>
               <span>{{ $user->name }}</span>
               (<span>
                @if($user->getRole)
                       {{ $user->getRole->name }}
                   @elseif($user->role=='admin')
                       <span class="text-success">مدیر</span>
                   @else
                       <span class="text-danger">کاربر عادی</span>
                   @endif
            </span>)
           </div>
        </div>
        <div class="panel_content">

            <?php $additionalInfo=$user->getAdditionalInfo ?>
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
                        <span>{{ $user->mobile }}</span>
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

            </table>

            @if(!empty(getUserPersonalData($additionalInfo,'company_name')))
                <p style="text-align: center;margin-top: 30px;font-weight: bold">اطلاعات حقوقی</p>
                <table class="table table-bordered order_table_info" style="margin: 20px auto!important;">
                    <tr>
                        <td>
                            نام شرکت :
                            <span>{{ getUserPersonalData($additionalInfo,'company_name') }}</span>
                        </td>
                        <td>
                            کد اقتصادی :
                            <span>{{ getUserPersonalData($additionalInfo,'company_economic_number') }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            شناسه ثبت :
                            <span>{{ getUserPersonalData($additionalInfo,'company_registration_number') }}</span>
                        </td>
                        <td>
                            شناسه حقیقی :
                            <span>{{ getUserPersonalData($additionalInfo,'company_national_identity_number') }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            شماره تلفن ثابت :
                            <span>{{ getUserPersonalData($additionalInfo,'company_phone') }}</span>
                        </td>
                        <td>
                            @if($additionalInfo)
                                استان و شهر:
                                <span>{{ $additionalInfo->getProvince->name.' - '.$additionalInfo->getCity->name  }}</span>
                            @endif
                        </td>
                    </tr>

                </table>
            @endif


        </div>
    </div>
@endsection
