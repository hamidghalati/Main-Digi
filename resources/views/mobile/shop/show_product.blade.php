@extends('layouts.mobile.mobile')
@section('head')
    <link rel="stylesheet" href="{{asset('css/swiper.min.css')}}">
@endsection
@section('content')
    <div style="position: relative;padding-bottom: 50px">


        @if(Session::has('comment_status'))
            <div class="alert @if(Session::get('comment_status')=='ok') alert-success @else alert-danger @endif custom-alert">
                @if(Session::get('comment_status')=='ok')
                    <span>نظر شما با موفقیت ثبت شد و بعد از تأیید، نمایش داده خواهد شد</span>
                @else
                    <p>خطا در ثبت اطلاعات، مجدداً تلاش نمایید</p>
                @endif
            </div>
        @endif



        <div class="product_item_box margin">
            <div class="product_headline">
                <h6 class="product_title">
                    {{$product->title}}
                    @if(!empty($product->ename) && $product->ename!='null')
                        <span>{{$product->ename}}</span>
                    @endif
                </h6>
            </div>
            <div class="product_options">
                <div>
                    <i class="mdi mdi-heart-outline" aria-hidden="true"></i>
                    <i class="mdi mdi-share-variant" aria-hidden="true"></i>
                    <i class="mdi mdi-chart-line" aria-hidden="true"></i>
                </div>
                <div style="display: flex;align-items: center">
                    <?php $width = 0;
                    if ($product->score_count > 0) {
                        $width = $product->score / ($product->score_count * 6);
                    }
                    $width = $width * 20;
                    ?>
                    <span> {{ replace_number($product->score_count) }} نفر </span>
                    <div class="score">
                        <div class="gray">
                            <div class="red" style="width: {{ $width }}%"></div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row">
                @if(sizeof($product->Gallery)>0)
                    <div class="swiper-container" id="gallery" dir="rtl">
                        <div class="swiper-wrapper">
                            @foreach($product->Gallery as $key=>$value)
                                <div class="swiper-slide">
                                    <img src="{{ url('files/gallery/'.$value->image_url) }}" alt="">
                                </div>
                            @endforeach
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                @else
                    <img class="product_image" src="{{ url('files/products/'.$product->image_url) }}" alt="">
                @endif
            </div>

            <div class="row">
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
            </div>

        </div>

        <div class="product_item_box">
            <div style="padding: 20px">
                @if($product->status==1)

                    <div id="warranty_box">
                        @include('include.warranty',['color_id'=>0])
                    </div>
                @else
                    <div class="product_unavailable">
                        <span>ناموجود</span>
                        <p>این محصول در حال حاضر ناموجود می باشد، می توانید از طریق لیست محصولات مرتبط، از محصولات مشابه
                            این کالا دیدن نمایید.</p>
                    </div>
                @endif
            </div>
        </div>

        @if($product->status==1)
            <mobile-other-price :product_id="{{ $product->id }}"></mobile-other-price>
        @endif

        @if($product->status==1)
            <div class="add_product_link">
                <span>افزودن محصول به سبد خرید</span>
                <i class="mdi mdi-shopping-outline"></i>
            </div>
        @endif

        @if($product_item_count>0)
            <div class="product_item_box">
                <div style="padding: 15px">
                    <div class="item_box remove_item_box_shadow">
                        <span>مشخصات فنی</span>
                        <a id="show_more_item_product">
                            <span>بیشتر</span>
                            <i class="mdi mdi-chevron-left"></i>
                        </a>
                    </div>
                    @include('include.show_important_item',['remove_title'=>true])
                </div>

            </div>
        @endif
        @include('mobile.show_product_comments')
    </div>

    @include('mobile.product_item_list')


@endsection

@section('seo')
    <meta name="description" content="{{ $product->description }}">
    <meta name="keywords" content="{{ $product->keywords}}">
    <meta property="og:site_name" content="{{ config('shop-info.shop_name') }}" />
    <meta property="og:description" content="{{ $product->description }}" />
    <meta property="og:title" content="{{ $product->title }}" />
    <meta property="og:locale" content="fa_IR" />
    <meta property="og:image" content="{{url('files/products/'.$product->image_url)}}" />
    <meta name="twitter:description" content="{{ $product->description}}">
    <meta name="twitter:title" content="{{ $product->title}}">
    <meta property="twitter:image" content="{{url('files/products/'.$product->image_url)}}" />
@endsection

@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>
    <script>
        var sliders = new Swiper('#gallery', {
            pagination: {
                el: '.swiper-pagination',

            }
        });

        var product_slider = new Swiper('.products', {
            slidesPerView: 2,
            spaceBetween: 10,
        });

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    </script>
@endsection
