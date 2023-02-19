@extends('layouts.shop.shop')
@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('include.user_panel_menu',['active'=>'profile'])
        </div>
        <div class="col-md-9" style="padding: 0">
            <span class="profile_menu_title">ویرایش اطلاعات شخصی</span>
            <div class="profile_menu" >


                <div class=" profile_info">
                    <form id="additional_info" action="{{ url('user/profile/additional-info') }}" method="post">
                        @csrf

                        <?php
                        $additional_input=['first_name'=>'نام','last_name'=>'نام خانوادگی','national_identity_number'=>'کد ملی'
                            ,'mobile_phone'=>'شماره موبایل','email'=>'پست الکترونیک','bank_card_number'=>'شماره کارت ',];
                        $legal=['company_name'=>'نام شرکت','company_economic_number'=>'کد اقتصادی','company_registration_number'=>'شناسه ثبت'
                            ,'company_national_identity_number'=>'شناسه حقیقی','company_phone'=>'شماره تلفن ثابت']
                            ?>

                        <div class="row">
                            <div class="col-md-6">
                                <span class="profile_menu_title">حساب حقیقی (شخصی)</span>
                                @foreach($additional_input as $key=>$value)
                                    <div class="form-group">
                                        <div class="account_title">{{ $value }}</div>
                                        <label for="" class="input_label">
                                            <input type="text" class="form-control @if($errors->has($key)) validate_error_border @endif"
                                                   value="{{ getUserData($key,$additionalInfo) }}" name="{{ $key }}" placeholder="لطفا {{ $value }} خود را وارد نمایید">
                                            @if($errors->has($key))
                                                <label for="" class="feedback_hint" style="display: block">
                                                    <span> {{ $errors->first($key) }}</span>
                                                </label>
                                            @endif
                                        </label>
                                    </div>
                                @endforeach

                                <div class="form-group row">
                                    <input type="checkbox" @if( getUserData('newsletter',$additionalInfo)=='yes') checked @endif name="newsletter" class="form-check-input">
                                    <span class="check_box  @if( getUserData('newsletter',$additionalInfo)=='yes')@endif active" id="newsletter"></span>
                                    <span class="form-check-label"> اشتراک در خبرنامه {{ env('shop_name') }}</span>
                                </div>

                            </div>


                            <div class="col-md-6">
                                <span class="profile_menu_title">حساب حقوقی </span>
                                @foreach($legal as $key=>$value)
                                    <div class="form-group">
                                        <div class="account_title">{{ $value }}</div>
                                        <label for="" class="input_label">
                                            <input type="text" class="form-control @if($errors->has($key)) validate_error_border @endif"
                                                   value="{{ getUserData($key,$additionalInfo) }}" name="{{ $key }}" placeholder="لطفا {{ $value }} خود را وارد نمایید">
                                            @if($errors->has($key))
                                                <label for="" class="feedback_hint" style="display: block">
                                                    <span> {{ $errors->first($key) }}</span>
                                                </label>
                                            @endif
                                        </label>
                                    </div>
                                @endforeach

                                <div class="account_title">  محل دفتر مرکزی </div>
                                <div class="row" id="location">
                                    <div class="col-md-6">
                                        <label for="" class="input_label">
                                            {{ Form::select('province_id',$province,null,['class'=>'selectpicker','data-live-search'=>'true']) }}
                                            @if($errors->has('province_id'))
                                                <label for="" class="feedback_hint" style="display: block">
                                                    <span> استان انتخاب نشده است</span>
                                                </label>
                                            @endif
                                        </label>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="" class="input_label" >
                                            {{ Form::select('city_id',[''=>'انتخاب شهر'],null,['class'=>'selectpicker','data-live-search'=>'true']) }}
                                            @if($errors->has('city_id'))
                                                <label for="" class="feedback_hint" style="display: block">
                                                    <span> شهر انتخاب نشده است</span>
                                                </label>
                                            @endif
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <button class="btn btn-success">ثبت اطلاعات</button>
                            <button class="btn btn-dark">انصراف</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    </div>
@endsection
