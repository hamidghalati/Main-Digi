<!doctype html>
<html lang="fa">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    @yield('header')

    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    <link href="{{ asset('css/mobile.css') }}" rel="stylesheet">


    <title>فروشگاه من</title>
</head>

<body>

<div id="app">




    <div class="container-fluid">

        <div class="add_comment_box" style="right: 0">
            <div class="header">
                <span>افزودن نظر</span>
                <a href="{{ url('product/dkp-'.$product->id.'/'.$product->product_url) }}">
                    <span>بازگشت</span>
                    <i class="mdi mdi-chevron-left"></i>
                </a>
            </div>

            <div class="content">

                <div class="product_info" id="score_box">
                    <form method="post" id="comment_form" action="">
                        @csrf
                        <div class="row profile_item">
                            <div class="col-md-12">
                                <div class="score_box_header">
                                    <span class="title">
                                        ثبت امتیاز برای :
                                        {{$product->title}}
                                    </span>

                                </div>
                                <div class="row">
                                    <?php
                                    $score_item1=['کیفیت ساخت','نوآوری','سهولت استفاده'];
                                    $score_item2=['ارزش خرید به نسبت قیمت','امکانات و قابلیت ها','سهولت طراحی و ظاهر'];
                                    ?>

                                    <div class="comment_form_div">
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

                        <div class="row profile_item">

                            <div class="col-md-12">
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

                        </div>

                    </form>
                </div>

            </div>

        </div>
    </div>


    <div id="loading">
        <span class="loader"></span>
        <h6>لطفاً صبور باشید</h6>
    </div>


</div>

<script src="{{ asset('js/mobile.js') }}" type="text/javascript"></script>
</body>


</html>
