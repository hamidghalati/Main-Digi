@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت انبار ها','url'=>url('admin/stockrooms')],
    ['title'=>'خروج محصول از انبار ','url'=>url('admin/stockroom/add/output')],

    ]])
    <div class="panel">
        <div class="header">
            افزودن لیست خروج محصول از انبار
        </div>
        <div class="panel_content">

            @include('include.alert')

            <stockroom-output-list :stockroom=" {{ $stockroom }}"></stockroom-output-list>





        </div>
    </div>

@endsection


