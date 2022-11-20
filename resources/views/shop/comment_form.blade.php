@extends('layouts.shop.shop')

@section('content')

    <div style="margin-top: 40px" class="content">
        <div class="product_info" id="score_box">
            <form method="post" id="comment_form" action="">
                @csrf
                <div class="row">
                    <div class="col-md-4">
                        <img src="{{ url('files/thumb/'.$product->image_url) }}" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="score_box_header">
                            <p>{{$product->title}}</p>
                            @if(!empty($product->ename) && $product->ename!='null')
                                <p>{{$product->ename}}</p>
                            @endif
                        </div>
                        <div class="row">
                            <?php
                                $score_item1=['کیفیت ساخت','نوآوری','سهولت استفاده'];
                                $score_item2=['ارزش خرید به نسبت قیمت','امکانات و قابلیت ها','سهولت طراحی و ظاهر'];
                                ?>
                            <div class="col-md-6">
                                @foreach($score_item1 as $item)
                                    <div class="range_box">
                                        <label for="" class="label">{{ $item }}</label>
                                        <div class="range_slider_div" data-rate-title="معمولی">
                                            <span class="js-slider-step slider_step_two active_range_step" data-rate-title="خیلی بد"></span>
                                            <span class="js-slider-step slider_step_three active_range_step" data-rate-title=" بد"></span>
                                            <span class="js-slider-step slider_step_four " data-rate-title="معمولی"></span>
                                            <span class="js-slider-step slider_step_five" data-rate-title="خوب"></span>
                                            <span class="js-slider-step slider_step_six" data-rate-title="عالی"></span>

                                            <div class="active_range_slider"></div>

                                        </div>
                                        <input type="range" min="0" max="4" value="2" name="score_item[]" class="item_slider">
                                    </div>
                                @endforeach
                            </div>
                            <div class="col-md-6">
                                @foreach($score_item2 as $item)
                                    <div class="range_box">
                                        <label for="" class="label">{{ $item }}</label>
                                        <div class="range_slider_div" data-rate-title="معمولی">
                                            <span class="js-slider-step slider_step_two active_range_step" data-rate-title="خیلی بد"></span>
                                            <span class="js-slider-step slider_step_three active_range_step" data-rate-title=" بد"></span>
                                            <span class="js-slider-step slider_step_four " data-rate-title="معمولی"></span>
                                            <span class="js-slider-step slider_step_five" data-rate-title="خوب"></span>
                                            <span class="js-slider-step slider_step_six" data-rate-title="عالی"></span>

                                            <div class="active_range_slider"></div>

                                        </div>
                                        <input type="range" min="0" max="4" value="2" name="score_item[]" class="item_slider">
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">

                    <div class="col-md-5">
                        <div class="score_comment_form">
                            <div class="form-group">
                                <div class="account_title" style="margin-bottom: 10px">  عنوان نظر شما (اجباری) :</div>
                                <label for="" class="input_label">
                                    <input type="text" class="form-control" name="title" id="comment_title" placeholder="عنوان نظر خود را وارد نمایید">
                                    <label  id="comment_title_error_message" class="feedback_hint" ></label>
                                </label>
                            </div>
                            <div class="row">
                                <div class="col-md-6" style="padding-right: 0!important;">
                                    <div class="positive_item">نقاط قوت</div>
                                    <div class="input_add_point advantage">
                                        <input type="text" value="" id="advantage">
                                        <button type="button"></button>
                                    </div>

                                    <div id="advantage_input_box" class="item_list"></div>

                                </div>

                                <div class="col-md-6" style="padding-left: 0!important;">

                                    <div class="negative_item negative">نقاط ضعف</div>
                                    <div class="input_add_point disadvantage">
                                        <input type="text" value="" id="disadvantage">
                                        <button type="button"></button>
                                    </div>

                                    <div id="disadvantage_input_box" class="item_list"></div>

                                </div>

                            </div>
                            <div class="form-group">
                                <div class="account_title">متن نظر شما (اجباری) :</div>
                                <label for="" class="input_label">
                                    <textarea class="form-control" name="content" id="comment_content" placeholder="متن نظر خود را وارد نمایید"></textarea>
                                    <label id="comment_content_error_message"  class="feedback_hint_error"></label>
                                </label>
                            </div>

                            <div class="form-group">
                                <button class="add_comment_btn">ثبت نظر</button>
                            </div>

                        </div>
                    </div>



                    <div class="col-md-7">
                        <div class="add_comment_tozihat">
                            <h4>
                                دیگران را با نوشتن نظرات خود، برای انتخاب این محصول راهنمایی کنید
                            </h4>
                            <p>لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید :</p>
                            <p>فارسی بنویسید و از کیبورد فارسی استفاده کنید</p>
                            <p>بهتر است از فضای خالی (Space) بیش‌از‌حدِ معمول، شکلک یا ایموجی استفاده نکنید و از کشیدن حروف یا کلمات با صفحه‌کلید بپرهیزید.</p>
                            <p>نظرات خود را براساس تجربه و استفاده‌ی عملی و با دقت به نکات فنی ارسال کنید؛ بدون تعصب به محصول خاص، مزایا و معایب را بازگو کنید و بهتر است از ارسال نظرات چندکلمه‌‌ای خودداری کنید.بهتر است در نظرات خود از تمرکز روی عناصر متغیر مثل قیمت، پرهیز کنید.به کاربران و سایر اشخاص احترام بگذارید.</p>
                            <p>پیام‌هایی که شامل محتوای توهین‌آمیز و کلمات نامناسب باشند، حذف می‌شوند.</p>
                            <p>از ارسال لینک‌های سایت‌های دیگر و ارایه‌ی اطلاعات شخصی خودتان مثل شماره تماس، ایمیل و آی‌دی شبکه‌های اجتماعی پرهیز کنید.</p>

                        </div>
                    </div>

                </div>

            </form>
        </div>
    </div>


@endsection
