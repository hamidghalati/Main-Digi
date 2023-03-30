@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت سفارشات','url'=>url('admin/orders')]]])
    <div class="panel">
        <div class="header">
            مدیریت سفارشات

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/orders','title'=>'سفارش'])

        </div>
        <div class="panel_content">

            @include('include.alert')


            <form action="" method="get" class="search_form order_search">
                @if(isset($_GET['trashed']) && $_GET['trashed']==true)
                    <input type="hidden" name="trashed" value="true">
                @endif
                <input autocomplete="off" type="text" name="order_id" class="form-control" value="{{$req->get('order_id','')}}" placeholder="شماره سفارش مورد نظر را وارد کنید">
                <input autocomplete="off" type="text" name="first_date" class="form-control pdate" id="pcal1" value="{{$req->get('first_date','')}}" placeholder="از تاریخ ">
                <input autocomplete="off" type="text" name="end_date" class="form-control pdate" id="pcal2" value="{{$req->get('end_date','')}}" placeholder="تا تاریخ">
                <button class="btn btn-primary btn_search">جستجو
                </button>

            </form>

            <?php

            use Hekmatinasser\Verta\Verta;

            $v = new Verta();
            ?>
            <form method="post"  id="data_form">
                @csrf
                @include('include.orderList')
            </form>


            {{$orders->links()}}


        </div>
    </div>




@endsection

@section('header')
    <link rel="stylesheet" href="{{asset('css/jspc-gray.css')}}">
@endsection

@section('footer')
    <script type="text/javascript" src="{{asset('js/js-persian-cal.min.js')}}"></script>

    <script>
        const pcal1=new AMIB.persianCalendar('pcal1');
        const pcal2=new AMIB.persianCalendar('pcal2');
    </script>
@endsection
