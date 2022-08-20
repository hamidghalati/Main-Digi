@extends('layouts.shop.shop')

@section('content')

    <div class="content">
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
                            <a href="">
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
                        <div class="col-8">
                            <div id="warranty_box">
                                @include('include.warranty',['color_id'=>0])
                            </div>

                            <div class="send_btn">
                                <span class="line"></span>
                                <span class="title"> افزودن به سبد خرید</span>
                            </div>

                        </div>
                        <div class="col-4"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>


@endsection

@section('footer')
    <script>


        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

    </script>
@endsection
