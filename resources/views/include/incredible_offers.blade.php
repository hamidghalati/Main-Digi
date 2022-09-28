@if(sizeof($incredible_offers)>0)
    <div class="row incredible-offers">
        <div class="col-3">
            <div style="margin-top: 20px">
                <a href="{{url('')}}">
                    <img src="{{url('files/images/direct-access7.jpg')}}" alt="" class="index-pic">
                </a>
                <a href="{{url('')}}">
                    <img src="{{url('files/images/direct-access3.jpg')}}" alt="" class="index-pic">
                </a>
            </div>
        </div>

        <div class="col-9">
            <div class="discount_box">
                <div class="row">
                    {{--right incredible--}}
                    <div class="discount_box_content">
                        @foreach($incredible_offers as $key=>$value)
                            <div @if($key==0) style="display: block"  @endif id="discount_box_link_{{$value->id}}" class="item an">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="discount_bottom_bar"></div>
                                        <a href="{{url('product/dkp-'.$value->getProduct->id.'/'.$value->getProduct->product_url)}}">
                                            <img src="{{url('files/thumb/'.$value->getProduct->image_url)}}" alt="">
                                        </a>
                                    </div>
                                    <div class="col-6">
                                        <a href="{{url('product/dkp-'.$value->getProduct->id.'/'.$value->getProduct->product_url)}}">
                                            <div class="price_box">
                                                <del>{{replace_number(number_format($value->price1))}} تومان</del>
                                                <div class="incredible-offers-price">
                                                    <label >{{replace_number(number_format($value->price2))}} تومان</label>
                                                    <span class="discount-badge">
                                                    <?php
                                                        $a=($value->price2/$value->price1)*100;
                                                        $a=100-$a;
                                                        $a=round($a);
                                                        ?>
                                                        {{'%'.replace_number($a).' تخفیف  '}}
                                                </span>
                                                </div>
                                                <div class="discount_title">{{$value->getProduct->title}}</div>
                                                <ul class="important_item_ul">
                                                    @foreach($value->itemValue as $key=>$item )
                                                        @if($key<2)
                                                            <li>
                                                                {{$item->important_item->title}} :
                                                                {{$item->item_value}}
                                                            </li>
                                                        @endif
                                                    @endforeach
                                                </ul>
                                                @if($value->product_number>0)
                                                    <counter second="<?= $value->offers_last_time-time()?>"></counter>
                                                @else
                                                @endif

                                            </div>

                                        </a>

                                    </div>
                                </div>
                            </div>

                        @endforeach
                    </div>
                    {{--right incredible--}}
                    <div class="discount_left_item">
                        <?php $i=0?>
                        @foreach($incredible_offers as $key=>$value)
                            <div id="item_number_{{$i}}" @if($i==0) class="active" @endif data-id="<?= $value->id?>">
                                {{$value->getProduct->getCat->name}}
                                <?php $i++ ?>
                            </div>
                        @endforeach
                        @if(sizeof($incredible_offers)>=9)
                            <a href="{{url('incredible-offers')}}">
                                مشاهده همه شگفت انگیزها
                            </a>
                        @endif

                    </div>


                </div>


                <div class="discount_box_footer">
                    <div class="swiper-container" dir="rtl">
                        <div class="swiper-wrapper">
                            @foreach($incredible_offers as $key=>$value)
                                <div class="swiper-slide @if($key==0) active @endif slide-amazing" data-id="{{$value->id}}" >
                                    {{$value->getProduct->getCat->name}}
                                </div>
                            @endforeach
                            @if(sizeof($incredible_offers)>4)
                                <div class="swiper-slide"></div>
                                <div class="swiper-slide"></div>
                            @endisset

                        </div>

                        <div class="slick-next"></div>
                        <div class="slick-prev"></div>

                    </div>

                </div>
            </div>
        </div>

    </div>
@endif
