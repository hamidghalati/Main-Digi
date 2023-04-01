@extends('layouts.admin.admin')


@section('content')
    @include('include.breadcrumb')
    <div class="panel">
        <div>
            <p style="margin-top: 40px;text-align: center;padding-bottom: 20px;color: red">
                <span>{{ Auth::user()->name }} عزیز </span>
                به پنل مدیریت  {{ env('SHOP_NAME','') }} خوش آمدید
            </p>
        </div>
    </div>

@endsection

