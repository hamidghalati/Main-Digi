@extends('layouts.shop.shop')
@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('include.user_panel_menu',['active'=>'profile'])
        </div>
        <div class="col-md-9" style="padding: 0">

            <div class="profile_menu">
                <span class="profile_menu_title" style="text-align: center;font-size: 20px">ویرایش اطلاعات شخصی</span>


                @if(Session::has('status'))
                    <div class="alert alert-success custom_alert">{{ Session::get('status') }}</div>
                @endif


                <div class=" profile_info">
                    <form id="additional_info" action="{{ url('user/profile/additional-info') }}" method="post">
                        @csrf

                        <?php
                        $additional_input = ['first_name' => 'نام ', 'last_name' => 'نام خانوادگی ', 'national_identity_number' => 'کد ملی '
                            , 'mobile_phone' => 'شماره موبایل ', 'email' => ' پست الکترونیک', 'bank_card_number' => 'شماره کارت  ',];
                        $legal = ['company_name' => ' نام شرکت', 'company_economic_number' => ' کد اقتصادی', 'company_registration_number' => ' شناسه ثبت'
                            , 'company_national_identity_number' => 'شناسه حقیقی ', 'company_phone' => ' شماره تلفن ثابت']
                        ?>

                        <div class="row" id="profile_info">
                            <div class="col-md-6">
                                <span class="profile_menu_title center"
                                      style="font-size: 17px;">حساب حقیقی (شخصی)</span>
                                @foreach($additional_input as $key=>$value)
                                    <div class="form-group">
                                        <div class="account_title">{{ $value }}:</div>
                                        <label for="" class="input_label">
                                            <input type="text"
                                                   class="form-control @if($errors->has($key)) validate_error_border @endif"
                                                   value="{{ getUserData($key,$additionalInfo) }}" name="{{ $key }}"
                                                   placeholder="لطفاً {{ $value }} خود را وارد نمایید">
                                            @if($errors->has($key))
                                                <label for="" class="feedback_hint_error" style="display: block">
                                                    <span> {{ $errors->first($key) }}</span>
                                                </label>
                                            @endif
                                        </label>
                                    </div>
                                @endforeach

                                <div class="form-group row">
                                    <input type="checkbox"
                                           @if( getUserData('newsletter',$additionalInfo)=='yes') checked
                                           @endif name="newsletter" class="form-check-input">
                                    <span
                                        class="check_box  @if( getUserData('newsletter',$additionalInfo)=='yes')@endif active"
                                        id="newsletter"></span>
                                    <span class="form-check-label"> اشتراک در خبرنامه {{ env('shop_name') }}</span>
                                </div>

                            </div>

                            <div class="col-md-6">
                                <span class="profile_menu_title center" style="font-size: 17px;">حساب حقوقی </span>
                                <div class="toggle_box" id="account_type_toggle">
                                    <div class="toggle-light" id="account_type"></div>
                                    <input type="hidden" name="legal" id="legal"
                                           value="{{ old('legal') ? old('legal') : 'false' }}">
                                    <span>مایل به تکمیل اطلاعات حقوقی برای خرید سازمانی هستم.</span>
                                </div>
                                <p class="center legal_text">
                                    با تکمیل اطلاعات حقوقی سازمان مورد نظر خود می توانید اقدام به خرید سازمانی با دریافت
                                    فاکتور رسمی و گواهی ارزش افزوده نمایید.
                                </p>
                                @foreach($legal as $key=>$value)
                                    <div class="form-group">
                                        <div class="account_title">{{ $value }} :</div>
                                        <label for="" class="input_label">
                                            <input type="text"
                                                   class="form-control @if($errors->has($key)) validate_error_border @endif"
                                                   value="{{ getUserData($key,$additionalInfo) }}" name="{{ $key }}"
                                                   placeholder="لطفاً {{ $value }} خود را وارد نمایید">
                                            @if($errors->has($key))
                                                <label for="" class="feedback_hint_error" style="display: block">
                                                    <span> {{ $errors->first($key) }}</span>
                                                </label>
                                            @endif
                                        </label>
                                    </div>
                                @endforeach

                                <div class="account_title"> محل دفتر مرکزی :</div>

                                <div class="row" id="location">

                                    <div class="col-md-6">
                                        <label for="" class="input_label">
                                            {{ Form::select('province_id',$province,null,['class'=>'selectpicker','data-live-search'=>'true','id'=>'profile_province_id']) }}
                                            @if($errors->has('province_id'))
                                                <label for="" class="feedback_hint_error" style="display: block">
                                                    <span> استان انتخاب نشده است</span>
                                                </label>
                                            @endif
                                        </label>
                                    </div>

                                    <div class="col-md-6">
                                        <label for="" class="input_label">
                                            {{ Form::select('city_id',[''=>'انتخاب شهر'],null,['class'=>'selectpicker','data-live-search'=>'true','id'=>'profile_city']) }}
                                            @if($errors->has('city_id'))
                                                <label for="" class="feedback_hint_error" style="display: block">
                                                    <span> شهر انتخاب نشده است</span>
                                                </label>
                                            @endif
                                        </label>
                                    </div>

                                </div>

                                @if(old('legal') != 'true')

                                @endif

                                <div class="form_cover" @if(old('legal') == 'true') style="display: none" @endif>
                                    <span>ثبت اطلاعات حقوقی</span>
                                </div>

                            </div>
                        </div>

                        <div class="footer">
                            <button class="btn btn-success">ثبت اطلاعات</button>
                            <button class="btn btn-dark">انصراف</button>
                        </div>

                        <div class="creditcart">
                            <img  width="32px"  src="https://shaba.smohammadabedy.ir/bank-iran/no-img.png">
                            <input type="text"  class="creditcart-input" style="direction:ltr" placeholder="شماره کارت را وارد کنید">
                        </div>

                        <div class="shaba-number">
                            <img  width="32px"  src="https://shaba.smohammadabedy.ir/bank-iran/no-img.png">
                            <input type="text"  class="shaba-input"    style="direction:ltr" placeholder="کد شبا را وارد کنید">
                            <span>بدون IR</span>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    </div>
@endsection
@section('header')
    <link rel="stylesheet" href="{{url('css/toggles-full.css')}}">
@endsection
@section('footer')
    <script type="text/javascript" src="{{url('js/toggles.min.js')}}"></script>
    <script type="text/javascript" src="{{url('js/Bank.js')}}"></script>
    <script>
        $('#account_type').toggles({
            type: 'Light',
            text: {'on': '', 'off': ''},
            width: 50,
            direction: 'rtl',
            on: false
        });
        $("#account_type").on('toggle', function (e, action) {
            if (action) {

                $('.form_cover').hide();
                document.getElementById('legal').value = 'true';
            } else {
                $('.form_cover').show();
                document.getElementById('legal').value = 'false';
            }
        });
        @if(old('legal')=='true')
            $("#account_type").click();
        @endif
    </script>
@endsection
