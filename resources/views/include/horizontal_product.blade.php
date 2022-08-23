@if(sizeof($products)>0)
<div class="product_box">
        <div class="box_title">
            <h5>{{$title}}</h5>
        </div>
        <div class="product_list" dir="rtl">
            @foreach($products as $product)

                <a href="{{url('product/dkp-'.$product->id.'/'.$product->product_url)}}">
                    <div class="product">
                        <div class="product_img_div">
                            <img src="{{url('files/thumb/'.$product->image_url)}}" alt="">
                            @if(!empty($product->discount_price))
                                <?php  $price1=$product->price+$product->discount_price;?>

                                <span class="discount-badge">

                                         <?php

                                    $a=($product->price/$price1)*100;
                                    $a=100-$a;
                                    $a=round($a);
                                    ?>
                                    {{'%'.replace_number($a)}}

                                    </span>
                            @endif
                        </div>
                        <p class="title">
                            @if(strlen($product->title)>33)
                                {{mb_substr($product->title,0,33).'...'}}
                            @else
                                {{$product->title}}
                            @endif
                        </p>
                        <p class="discount_price">
                            @if(!empty($product->discount_price))
                                <del>{{replace_number(number_format($price1))}}</del>
                            @endif
                        </p>
                        <p class="price">
                            {{replace_number(number_format($product->price)).'تومان'}}
                        </p>
                    </div>
                </a>
            @endforeach
        </div>
    </div>
@endif
