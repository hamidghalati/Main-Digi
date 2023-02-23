@extends('layouts.mobile.mobile')
@section('content')
    <?php
    $newsletter=getUserPersonalData($additionalInfo,'newsletter')=='yes' ? 'بلی' : 'خیر';
    $item_list = array();
    $item_list[0]=['title'=>' نام و نام خانوادگی :','value'=>getUserPersonalData($additionalInfo, 'first_name', 'last_name')];
    $item_list[1]=['title'=>'پست الکترونیک :','value'=>getUserPersonalData($additionalInfo,'email') ];
    $item_list[2]=['title'=>' شماره تلفن همراه :','value'=>Auth::user()->mobile ];
    $item_list[3]=['title'=>'کد ملی :','value'=>getUserPersonalData($additionalInfo,'national_identity_number')];
    $item_list[4]=['title'=>'دریافت خبرنامه :','value'=>$newsletter];
    $item_list[5]=['title'=>'شماره کارت بانک :','value'=>getUserPersonalData($additionalInfo,'bank_card_number')];
    ?>

    <div class="profile_item profile_item_list">
        @foreach($item_list as $key=>$value)
            <div class="profile_item_header personal_info">
                <span>{{ $value['title'] }}</span>
                <span>{{ $value['value'] }}</span>
            </div>
        @endforeach
            <a class="btn profile_edit_link" href="{{ url('user/profile/additional-info') }}">ویرایش</a>
    </div>










@endsection
