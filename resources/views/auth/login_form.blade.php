<div id="auth_box">
    <div class="auth_box_title">
        <span>ورود به سایت</span>
    </div>

    <div style="margin: 25px">
        <form method="POST" action="{{ route('login') }}" id="login_form">
            @csrf

            <div class="form-group">
                <div class="field_name">شماره موبایل :</div>
                <label for="" class="input_label user_name">
                    <input type="text" class="form-control " name="mobile" id="login_mobile" value="{{ old('name') }}"
                           placeholder="شماره موبایل خود را وارد نمایید">
                    <label id="mobile_error_message" class="feedback_hint">

                    </label>

                </label>
            </div>

            <div class="form-group">
                <div class="field_name">کلمه عبور :</div>
                <label for="" class="input_label user_pass">
                    <input type="password"
                           class="form-control @if($errors->has('password')) validate_error_border @endif"
                           name="password" id="login_password" placeholder="کلمه عبور خود را وارد نمایید">
                    <label id="password_error_message" class="feedback_hint"
                           @if($errors->has('password')) style="display: block" @endif>
                        @if($errors->has('password'))
                            <span>{{$errors->first('password')}}</span>
                        @endif
                    </label>

                </label>
            </div>

            @if($errors->has('mobile'))
                <div class="alert alert-danger">{{$errors->first('mobile')}}</div>
            @endif


            <div class="send_btn login_btn" id="login_btn">
                <span class="line"></span>
                <span class="title">ورود به سایت</span>
            </div>

            <div class="form-group row" style="margin-right: 3px;padding-top: 10px;">
                <input checked="checked" class="form-check-input" type="checkbox" name="remember"
                       id="remember" {{ old('remember') ? 'checked' : '' }}>
                <span class="check_box active" id="login_remember"></span>
                <span class="form-check-label">مرا به خاطر بسپار</span>

            </div>
        </form>
    </div>

    <div class="alert alert-warning">
        <span>کاربر جدید هستید؟</span>
        <span>
                <a class="data_link" href="{{route('register')}}">ثبت نام</a>
        </span>
    </div>

</div>
