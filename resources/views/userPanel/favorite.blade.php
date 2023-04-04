@extends('layouts.shop.shop')
@section('content')
    <div class="row">
        <div class="col-md-3">
            @include('include.user_panel_menu',['active'=>'favorite'])
        </div>


        <div class="col-md-9" style="padding: 0">
            <div class="profile_menu">
                <span class="profile_menu_title">لیست علاقه مندی ها</span>


            </div>
        </div>
    </div>
@endsection

