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

            <?php $additionalInfo = $user->getAdditionalInfo ?>
            <p style="text-align: center;margin-top: 30px;font-weight: bold">اطلاعات حقیقی</p>
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

            @if(!empty(getUserData('company_name',$additionalInfo)))
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
                            استان و شهر:
                            @if($additionalInfo)
                                <span>{{ $additionalInfo->getProvince->name.' - '.$additionalInfo->getCity->name  }}</span>
                            @else
                                <span> - </span>
                            @endif
                        </td>
                    </tr>

                </table>
            @endif


            <div id="tab_div">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="order-tab" data-toggle="tab" href="#last_order" role="tab"
                           aria-controls="home" aria-selected="true">
                            <span class="fa fa-shopping-basket"></span>
                            <span>آخرین سفارشات کاربر</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="comment-tab" data-toggle="tab" href="#last_comment" role="tab"
                           aria-controls="profile" aria-selected="false">
                            <span class="fa fa-comments"></span>
                            <span>آخرین نظرات کاربر</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="question-tab" data-toggle="tab" href="#last_question" role="tab"
                           aria-controls="contact" aria-selected="false">
                            <span class="fa fa-question-circle"></span>
                            <span>آخرین پرسش های کاربر</span>
                        </a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="last_order" role="tabpanel" aria-labelledby="home-tab">
                        <div class="content_tab_div">
                            @include('include.orderList',['remove_delete_link'=>true])
                            @if(sizeof($orders)>0)
                                <div  style="padding-top: 20px">
                                    <a href="{{ url('admin/orders?user_id='.$user->id) }}" target="_blank">
                                        <span class="fa fa-arrow-left"></span>
                                        <span>نمایش لیست کامل سفارشات کاربر</span>
                                    </a>
                                </div>

                            @endif
                        </div>
                    </div>
                    <div class="tab-pane fade" id="last_comment" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="content_tab_div">
                            @include('include.CommentList',['remove_delete_link'=>true])
                            @if(sizeof($comments)>0)
                                <div style="padding-top: 20px">
                                    <a style="padding-top: 20px" href="{{ url('admin/comments?user_id='.$user->id) }}"
                                       target="_blank">
                                        <span class="fa fa-arrow-left"></span>
                                        <span>نمایش لیست کامل نظرات کاربر</span>
                                    </a>
                                </div>
                            @endif
                        </div>
                    </div>
                    <div class="tab-pane fade" id="last_question" role="tabpanel" aria-labelledby="contact-tab">
                        <div class="content_tab_div">
                            @include('include.QuestionList',['remove_delete_link'=>true])
                            @if(sizeof($questions)>0)
                                <div   style="padding-top: 20px">
                                    <a href="{{ url('admin/questions?user_id='.$user->id) }}" target="_blank">
                                        <span class="fa fa-arrow-left"></span>
                                        <span>نمایش لیست کامل پرسش های کاربر</span>
                                    </a>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
@endsection
