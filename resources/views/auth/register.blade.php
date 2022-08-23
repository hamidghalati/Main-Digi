@extends('layouts.auth.auth')

@section('content')

    <div id="auth_box">
        <div class="auth_box_title">
            <span>ثبت نام در سایت</span>
        </div>

        <div style="margin: 25px">
            <form method="POST" action="{{ route('register') }}" id="register_form">
                @csrf

                <div class="form-group">
                    <div class="field_name">شماره موبایل :</div>
                    <label for="" class="input_label user_name">
                        <input type="text" class="form-control @if($errors->has('mobile')) validate_error_border @endif " name="mobile" id="register_mobile" value="{{ old('name') }}" placeholder="شماره موبایل خود را وارد نمایید">
                        <label id="mobile_error_message" class="feedback_hint" @if($errors->has('mobile')) style="display: block" @endif>
                            @if($errors->has('mobile'))
                                <span>{{$errors->first('mobile')}}</span>
                            @endif
                        </label>

                    </label>
                </div>

                <div class="form-group">
                    <div class="field_name">کلمه عبور :</div>
                    <label for="" class="input_label user_pass">
                        <input type="password" class="form-control @if($errors->has('password')) validate_error_border @endif" name="password" id="register_password"  placeholder="کلمه عبور خود را وارد نمایید">
                        <label id="password_error_message" class="feedback_hint" @if($errors->has('password')) style="display: block" @endif>
                            @if($errors->has('password'))
                                <span>{{$errors->first('password')}}</span>
                            @endif
                        </label>

                    </label>
                </div>


                <div class="register_accept">
                    <label for="">
                        <span class="check_box active"></span>
                        <a href="" class="data_link">حریم خصوصی</a>
                        <span>و</span>
                        <a class="data_link" href="">شرایط و قوانین</a>
                        <span>استفاده از سرویس های سایت را مطالعه نموده و با کلیه موارد آن موافقم</span>
                    </label>
                </div>

                <div class="send_btn register_btn" id="register_btn">
                    <span class="line"></span>
                    <span class="title">ثبت نام در سایت</span>
                </div>

            </form>
        </div>

        <div class="alert alert-warning">
            <span>قبلاً در سایت ثبت نام کرده اید؟</span>
            <span>
                <a class="data_link" href="{{route('login')}}">وارد شوید</a>
            </span>
        </div>

    </div>

@endsection


































{{--<div class="container">--}}
{{--    <div class="row justify-content-center">--}}
{{--        <div class="col-md-8">--}}
{{--            <div class="card">--}}
{{--                <div class="card-header">{{ __('Register') }}</div>--}}

{{--                <div class="card-body">--}}
{{--                    <form method="POST" action="{{ route('register') }}">--}}
{{--                        @csrf--}}

{{--                        <div class="form-group row">--}}
{{--                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>--}}

{{--                            <div class="col-md-6">--}}
{{--                                <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>--}}

{{--                                @error('name')--}}
{{--                                <span class="invalid-feedback" role="alert">--}}
{{--                                        <strong>{{ $message }}</strong>--}}
{{--                                    </span>--}}
{{--                                @enderror--}}
{{--                            </div>--}}
{{--                        </div>--}}

{{--                        <div class="form-group row">--}}
{{--                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>--}}

{{--                            <div class="col-md-6">--}}
{{--                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">--}}

{{--                                @error('email')--}}
{{--                                <span class="invalid-feedback" role="alert">--}}
{{--                                        <strong>{{ $message }}</strong>--}}
{{--                                    </span>--}}
{{--                                @enderror--}}
{{--                            </div>--}}
{{--                        </div>--}}

{{--                        <div class="form-group row">--}}
{{--                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>--}}

{{--                            <div class="col-md-6">--}}
{{--                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">--}}

{{--                                @error('password')--}}
{{--                                <span class="invalid-feedback" role="alert">--}}
{{--                                        <strong>{{ $message }}</strong>--}}
{{--                                    </span>--}}
{{--                                @enderror--}}
{{--                            </div>--}}
{{--                        </div>--}}

{{--                        <div class="form-group row">--}}
{{--                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>--}}

{{--                            <div class="col-md-6">--}}
{{--                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">--}}
{{--                            </div>--}}
{{--                        </div>--}}

{{--                        <div class="form-group row mb-0">--}}
{{--                            <div class="col-md-6 offset-md-4">--}}
{{--                                <button type="submit" class="btn btn-primary">--}}
{{--                                    {{ __('Register') }}--}}
{{--                                </button>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </form>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}
{{--</div>--}}
