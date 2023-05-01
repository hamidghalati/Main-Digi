@extends('layouts.admin.admin')


@section('content')
    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت محصولات','url'=>url('admin/products')],
    ['title'=>'آمار فروش','url'=>url('admin/products/'.$product->id)],
    ]])
    <div class="panel">
        <div class="header">
            آمار فروش محصول : {{ $product->title }}


        </div>
        <div class="panel_content">
            <sale-report :product_id="{{ $product->id }}"></sale-report>

            <table class="table table-bordered table-striped" style="margin-top: 40px">
                <tr>
                    <td>میزان فروش محصول</td>
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
