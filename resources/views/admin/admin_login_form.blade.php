@extends("layouts.auth.auth")

@section('content')

    <div id="auth_box">
        <div class="auth_box_title">
            <span>ورود به بخش مدیریت</span>
        </div>

        <div style="margin: 30px">
            <form method="POST" action="{{ route('login') }}" id="admin_login_form">
                @csrf

                <div class="form-group">
                    <div class="field_name">نام کاربری :</div>
                    <label for="" class="input_label username">
                        <input type="text" class="form-control " name="username" id="username" value="{{ old('username') }}"
                               placeholder="نام کاربری خود را وارد نمایید">
                        <label id="username_error_message" class="feedback_hint">

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

                @if($errors->has('username'))
                    <div class="alert alert-danger">{{$errors->first('username')}}</div>
                @endif


                <div class="send_btn login_btn" id="admin_login_btn">
                    <span class="line"></span>
                    <span class="title">ورود به بخش مدیریت</span>
                </div>

                <div class="form-group row" style="margin-right: 3px;padding-top: 10px;">
                    <input checked="checked" class="form-check-input" type="checkbox" name="remember"
                           id="remember" {{ old('remember') ? 'checked' : '' }}>
                    <span class="check_box active" id="login_remember"></span>
                    <span class="form-check-label">مرا به خاطر بسپار</span>

                </div>
            </form>
        </div>



    </div>



@endsection

