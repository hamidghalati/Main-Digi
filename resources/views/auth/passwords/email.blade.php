@extends("layouts.auth.$layout")

@section('content')
    <div id="auth_box">
        <div class="auth_box_title">
            <span>یادآوری کلمه عبور</span>
        </div>

        <div style="margin: {{$margin}}px">

            @if (session('status'))
                <div class="alert alert-success" role="alert">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('password.email') }}" id="forget_password_form">
                @csrf

                <div class="form-group">
                    <div class="field_name">شماره موبایل :</div>
                    <label for="" class="input_label user_name">
                        <input type="text" class="form-control @if($errors->has('mobile')) validate_error_border @endif " name="mobile" id="mobile" value="{{ old('name') }}" placeholder="شماره موبایل خود را وارد نمایید">
                        <label id="mobile_error_message" class="feedback_hint" @if($errors->has('mobile')) style="display: block" @endif>
                            @if($errors->has('mobile'))
                                <span>{{$errors->first('mobile')}}</span>
                            @endif
                        </label>

                    </label>
                </div>

                <div class="send_btn forget_password" id="forget_password">
                    <span class="line"></span>
                    <span class="title">بازیابی کلمه عبور</span>
                </div>

            </form>
        </div>



    </div>
@endsection
