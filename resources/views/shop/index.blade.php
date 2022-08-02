@extends('layouts.shop.shop')
@section('content')
    <div class="row slider">
        <div class="col-2"></div>
        <div class="col-10">
            @if(sizeof($sliders)>0)
                <div class="slider_box">
                    <div style="position: relative" >
                        @foreach($sliders as $key=>$value)
                            <div class="slide_div an" id="slider_img_{{$key}}" @if($key==0)style="display: block" @endif>
                                <a href="{{$value->url}}" style="background-image: url('<?= url('files/slider/'.$value->image_url)?>')"></a>
                            </div>
                        @endforeach
                    </div>

                    <div id="right-slide" onclick="prev()"></div>
                    <div id="left-slide" onclick="next()"></div>

                </div>
               <div class="slider_box_footer">
                   <div class="slider_bullet_div">
                       @for($i=0;$i<sizeof($sliders);$i++)
                           <span id="slider_bullet_{{$i}}" @if($i==0) class="active"@endif></span>

                       @endfor
                   </div>
               </div>
            @endif
        </div>
    </div>

    <div class="row incredible-offers">
        <div class="col-2"></div>
        <div class="col-10">
            <div class="discount_box">
                <div class="row">
                    <div class="discount_box_content">
                        @foreach($incredible_offers as $key=>$value)
                            <div @if($key==0) style="display: block" @endif class="item">
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
                </div>
            </div>
        </div>
    </div>

@endsection
@section('footer')
    <script>
        load_slider('<?= sizeof($sliders)?>');
    </script>
@endsection


