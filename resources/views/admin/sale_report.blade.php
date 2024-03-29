@extends('layouts.admin.admin')


@section('content')
    @include('include.breadcrumb',['data'=>[['title'=>'آمار فروش','url'=>url('admin/report/sale')]]])
    <div class="panel">
        <div class="header">
            آمار فروش


        </div>
        <div class="panel_content">
            <sale-report></sale-report>

            <table class="table table-bordered table-striped" style="margin-top: 40px">
                <tr>
                    <td>میزان فروش کل</td>
                    <td>{{ number_format($total_sale) }} تومان </td>
                </tr>
                <tr>
                    <td>کمیسیون کسر شده</td>
                    <td>{{ number_format($commission) }} تومان </td>
                </tr>
            </table>

        </div>
    </div>

@endsection
