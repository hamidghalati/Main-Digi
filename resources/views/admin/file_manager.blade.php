@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت فایل ها','url'=>url('admin/file_manager')]]])
    <div class="panel">

        <div id="elfinder"></div>

    </div>

@endsection
@section('header')
    <link rel="stylesheet" href="{{asset('css/jquery-ui.min.css')}}">
    <link rel="stylesheet" href="{{asset('elFinder/css/theme.css')}}">
    <link rel="stylesheet" href="{{asset('elFinder/css/elfinder.min.css')}}">
@endsection
@section('footer')
    <script type="text/javascript" src="{{asset('js/jquery-ui.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('elFinder/js/elfinder.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('elFinder/js/i18n/elfinder.fa.js')}}"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#elfinder").elfinder({
                height:'470px',
                cssAutoLoad:false,
                url:'{{url('elFinder/php/connector.minimal.php')}}',
                lang:'fa'
            });
        });
    </script>
@endsection
