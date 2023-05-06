@extends("layouts.auth.$layout")

@section('content')
    <div id="auth_box">
        <div class="auth_box_title">
            <span>تایید شماره تلفن همراه</span>
        </div>
        <div class="alert alert-success">
            <span> برای شماره موبایل<span class="code_active">{{$mobile}}</span> کد تایید ارسال شده است </span>
        </div>

        <div style="margin: {{$margin}}px">

            <form method="POST" action="{{ url('password/confirm') }}" id="active_account_form">
                @csrf
                <div class="form-group">
                    <div class="field_name">کد تأیید را وارد نمایید :</div>
                    <input type="hidden" value="{{$mobile}}" id="mobile" name="mobile">
                    <div class="number_input_div">
                        <input type="text" name="forget_password_code" max="6" value="{{old('forget_password_code')}}" class="number_input number" maxlength="6">
                    </div>
                    <div class="line_box">
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                    <p id="forget_password_code">
                        <span>ارسال مجدد کد</span>
                        <span id="timer"></span>
                    </p>

                    @if(Session::has('validate_error'))
                        <p class="alert alert-danger">{{Session::get('validate_error')}}</p>
                    @endif

                    <div class="send_btn  register_btn" id="active_account_btn">
                        <span class="line"></span>
                        <span class="title" style="width: calc(100% - 91%)!important;">تایید کد</span>
                    </div>

                </div>
            </form>
        </div>






    </div>












@endsection


