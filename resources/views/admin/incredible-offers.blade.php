@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'پیشنهاد شگفت انگیز','url'=>url('admin/incredible-offers')]]])
    <div class="panel">
        <div class="header">
            مدیریت محصولات پیشنهاد شگفت انگیز

        </div>
        <div class="panel_content">

            @include('include.alert')

            <incredible-offers>

            </incredible-offers>
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
