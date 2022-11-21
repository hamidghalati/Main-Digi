@extends('layouts.shop.shop')

@section('content')

    <div class="content">
        @if(Session::has('comment_status'))
            <div class="alert @if(Session::get('comment_status')=='ok') alert-success @else alert-danger @endif">
                @if(Session::get('comment_status')=='ok')
                    نظر شما با موفقیت ثبت شد و بعد از تأیید، نمایش داده خواهد شد
                @else
                    خطا در ثبت اطلاعات، مجدداً تلاش نمایید
                @endif
            </div>
        @endif


        <div class="product_info">
            <div class="product_image_box">
                <offer-time></offer-time>

                <div>
                    <ul class="product_options">
                        <li data-toggle="tooltip" data-placement="left" title="افزودن به علاقه مندی ها">
                            <a href="">
                                <i class="mdi mdi-heart-outline" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li data-toggle="tooltip" data-placement="left" title="اشتراک گذاری">
                            <a href="">
                                <i class="fa fa-share-alt" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li data-toggle="tooltip" data-placement="left" title="مقایسه">
                            <a href="{{url('compare/dkp-'.$product->id)}}">
                                <i class="fa fa-rocket" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li data-toggle="tooltip" data-placement="left" title="نمودار قیمت">
                            <a href="">
                                <i class="fa fa-line-chart" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                    @if(!empty($product->image_url))
                       <div class="default_product_pic">
                           <img src="{{url('files/products/'.$product->image_url)}}" alt="">
                       </div>
                    @endif
                </div>
            </div>
            <div class="product_data">
                <div class="product_headline">
                    <h6 class="product_title">
                        {{$product->title}}
                        @if(!empty($product->ename) && $product->ename!='null')
                            <span>{{$product->ename}}</span>
                        @endif
                    </h6>
                </div>
                <div>
                    <ul class="list-inline product_data_ul">
                        <li>
                            <span>برند : </span>
                            <a href="{{url('brands/'.$product->getBrand->brand_ename)}}" class="data_link">
                                <span>{{$product->getBrand->brand_name}}</span>
                            </a>
                        </li>
                        <li>
                            <span>دسته بندی : </span>
                            <a href="{{url('search/'.$product->getCat->url)}}" class="data_link">
                                <span>{{$product->getCat->name}}</span>
                            </a>
                        </li>
                    </ul>
                    <div class="row">
                        <div class="col-7">
                            <div id="warranty_box">
                                @include('include.warranty',['color_id'=>0])
                            </div>

                            <div class="send_btn" id="cart_btn">
                                <span class="line"></span>
                                <span class="title"> افزودن به سبد خرید</span>
                            </div>

                        </div>
                        <div class="col-5">
                            @include('include.show_important_item')
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @include('include.horizontal_product',['title'=>' محصولات مرتبط','products'=>$relate_product])


        <div id="tab_div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active"  data-toggle="tab" href="#review" role="tab" aria-selected="true">
                        <span class="fa fa-camera-retro"></span>
                        <span>نقد و بررسی</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"  data-toggle="tab" href="#product_items" role="tab"  aria-selected="false">
                        <span class="fa fa-list-ul"></span>
                        <span>مشخصات فنی</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"  data-toggle="tab" href="#comments" role="tab"  aria-selected="false">
                        <span class="fa fa-comments"></span>
                        <span>نظرات کاربران</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"  data-toggle="tab" href="#question" role="tab"  aria-selected="false">
                        <span class="fa fa-question-circle"></span>
                        <span>پرسش و پاسخ</span>
                    </a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="review" role="tabpanel" aria-labelledby="home-tab">
                    @include('include.product_review')
                </div>
                <div class="tab-pane fade" id="product_items" role="tabpanel" aria-labelledby="profile-tab">
                    @include('include.product_items')
                </div>
                <div class="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="contact-tab">c</div>
                <div class="tab-pane fade" id="question" role="tabpanel" aria-labelledby="contact-tab">d</div>
            </div>
        </div>

    </div>


@endsection
@section('header')
    <link rel="stylesheet" href="{{asset('css/swiper.min.css')}}">
    <link rel="stylesheet" href="{{asset('slick/slick/slick.css')}}">
    <link rel="stylesheet" href="{{asset('slick/slick/slick-theme.css')}}">

@endsection
@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>

    <script>


        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });


    </script>
@endsection
