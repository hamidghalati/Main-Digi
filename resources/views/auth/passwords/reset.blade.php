@extends("layouts.auth.$layout")

@section('content')
    <div id="auth_box">
        <div class="auth_box_title">
            <span>تغییر کلمه عبور</span>
        </div>

        <div style="margin: {{$margin}}px">

            @if (session('status'))
                <div class="alert alert-success" role="alert">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('password.update') }}" id="updatePasswordForm">
                @csrf
                <input type="hidden" name="token" value="{{ $token }}">

                <div class="form-group">
                    <div class="field_name">شماره موبایل :</div>
                    <label for="" class="input_label user_name">
                        <input id="mobile" type="text" class="form-control @error('mobile') is-invalid @enderror"
                               name="mobile" value="{{ $mobile ?? old('mobile') }}" required autocomplete="mobile"
                               autofocus>
                        <label id="mobile_error_message" class="feedback_hint"
                               @if($errors->has('mobile')) style="display: block" @endif>
                            @if($errors->has('mobile'))
                                <span>{{$errors->first('mobile')}}</span>
                            @endif
                        </label>

                    </label>
                </div>

                <div class="form-group">
                    <div class="field_name">کلمه عبور :</div>
                    <label for="" class="input_label user_pass">
                        <input type="password" class="form-control @if($errors->has('password')) validate_error_border @endif" name="password" id="password"  placeholder="کلمه عبور خود را وارد نمایید">
                        <label id="password_error_message" class="feedback_hint" @if($errors->has('password')) style="display: block" @endif>
                            @if($errors->has('password'))
                                <span>{{$errors->first('password')}}</span>
                            @endif
                        </label>
                    </label>
                </div>

                <div class="form-group">
                    <div class="field_name"> تکرار کلمه عبور :</div>
                    <label for="" class="input_label user_pass">
                        <input id="password_confirmation" type="password" class="form-control @if($errors->has('password_confirmation')) validate_error_border @endif" name="password_confirmation" required autocomplete="تکرار کلمه عبور خود را وارد نمایید">

                        <label id="password_confirmation_error_message" class="feedback_hint" @if($errors->has('password')) style="display: block" @endif>
                            @if($errors->has('password'))
                                <span>{{$errors->first('password')}}</span>
                            @endif
                        </label>

                    </label>
                </div>


                <div class="send_btn forget_password" id="update_password_btn">
                    <span class="line"></span>
                    <span class="title">تغییر کلمه عبور</span>
                </div>

            </form>


        </div>


    </div>
@endsection
