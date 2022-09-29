<div class="profile_menu">
    <div class="profile_menu_header">حساب کاربری شما</div>
    <ul class="profile_menu_ul">
        <li @if($active=='profile') class="active_li" @endif>
            <a href="{{url('user/profile')}}">
                <i class="fa fa-user"></i>
                <span>پروفایل</span>
            </a>
        </li>

        <li @if($active=='orders') class="active_li" @endif>
            <a href="{{url('user/profile/orders')}}">
                <i class="fa fa-shopping-cart"></i>
                <span> سفارشات</span>

            </a>
        </li>

        <li @if($active=='favorite') class="active_li" @endif>
            <a href="{{url('user/profile/favorite')}}">
                <i class="fa fa-star"></i>
                <span>لیست علاقه مندی ها</span>

            </a>
        </li>

        <li @if($active=='comments') class="active_li" @endif>
            <a href="{{url('user/profile/comments')}}">
                <i class="fa fa-camera-retro"></i>
                <span>نقد و نظرات</span>
            </a>
        </li>

        <li @if($active=='gift-cart') class="active_li" @endif>
            <a href="{{url('user/profile/gift-cart')}}">
                <i class="fa fa-gift"></i>
                <span>کارت های هدیه</span>
            </a>
        </li>

        <li @if($active=='address') class="active_li" @endif>
            <a href="{{url('user/profile/address')}}">
                <i class="fa fa-address-card"></i>
                <span>آدرس ها</span>
            </a>
        </li>

        <li @if($active=='messages') class="active_li" @endif>
            <a href="{{url('user/profile/messages')}}">
                <i class="fa fa-envelope"></i>
                <span>پیام های من</span>
            </a>
        </li>


    </ul>
</div>
