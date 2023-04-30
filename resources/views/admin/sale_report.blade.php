@extends('layouts.admin.admin')


@section('content')
    @include('include.breadcrumb',['data'=>[['title'=>'آمار فروش','url'=>url('admin/report/sale')]]])
    <div class="panel">
        <div class="header">
            آمار فروش


        </div>
        <div class="panel_content">
            <sale-report></sale-report>
        </div>
    </div>

@endsection
