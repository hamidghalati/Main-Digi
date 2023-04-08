@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت انبار ها','url'=>url('admin/stockrooms')],
    ['title'=>'افزودن محصول به انبار ','url'=>url('admin/stockroom/add/input')],

    ]])
    <div class="panel">
        <div class="header">
            افزودن محصول به انبار
        </div>
        <div class="panel_content">

            @include('include.alert')

            <stockroom-product-list :stockroom=" {{ $stockroom }}"></stockroom-product-list>





        </div>
    </div>

@endsection


