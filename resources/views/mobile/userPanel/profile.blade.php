@extends('layouts.mobile.mobile')
@section('content')

    <div class="o-collapse">
        <?php
        $list=array();
        $list[0]=['title'=>'سفارشات','link'=>'user/profile/orders'];
        $list[1]=['title'=>'لیست علاقه مندی ها','link'=>'user/profile/favorite'];
        $list[2]=['title'=>'نقد و نظرات','link'=>'user/profile/comments'];
        $list[3]=['title'=>'کارت های هدیه','link'=>'user/profile/gift-cart'];
        $list[4]=['title'=>'آدرس ها','link'=>'user/profile/address'];
        $list[5]=['title'=>'پیغام های من','link'=>'user/profile/messages'];
        $list[6]=['title'=>'اطلاعات شخصی','link'=>'user/profile/personal-info'];
        ?>

        <div class="profile_item profile_item_list">
            @foreach($list as $key=>$value)
                <a href="{{ url($value['link']) }}">
                    <div class="profile_item_header" @if((sizeof($list)-1)==$key) style="border: 0" @endif>
                        <span>{{ $value['title'] }}</span>
                        <i class="fa fa-angle-left"></i>
                    </div>
                </a>
            @endforeach
        </div>


    </div>

@endsection
