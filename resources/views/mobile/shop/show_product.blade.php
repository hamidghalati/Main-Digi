@extends('layouts.shop.mobile')
@section('head')
    <link rel="stylesheet" href="{{asset('css/swiper.min.css')}}">
@endsection
@section('content')
    <div style="position: relative;padding-bottom: 50px">
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
                    if ($product->score_count >0) {
                        $width=$product->score/($product->score_count*6);
                    }
                    $width=$width*20;
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
                @endif
            </div>

        </div>
    </div>
@endsection
@section('footer')
    <script type="text/javascript" src="{{asset('js/swiper.min.js')}}"></script>
    {{--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>--}}
    <script>
        var sliders = new Swiper('#gallery', {
            pagination: {
                el: '.swiper-pagination'
            }
        });

        var product_slider = new Swiper('.products', {
            slidesPerView: 2,
            spaceBetween: 10,
        });
    </script>
@endsection
