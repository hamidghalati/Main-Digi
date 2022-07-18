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
