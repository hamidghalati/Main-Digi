@extends('layouts.admin.admin')


@section('content')
    @include('include.breadcrumb')
    <div class="panel">
        <div>
            <p style="padding-top: 100px;text-align: center;font-size: 50px">
                <span class="fa fa-exclamation-circle"></span>
            </p>
            <p style="text-align: center;padding-bottom: 80px">اجازه دسترسی به این قسمت را ندارید </p>
        </div>
    </div>

@endsection
