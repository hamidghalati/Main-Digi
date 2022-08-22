<form action="{{url('cart')}}" method="post">
    {{csrf_field()}}


    <?php
    $warranty_id=0;
    $send_time=-1;
    $product_price1=0;
    $product_price2=0;
    ?>

    <ul class="color_ul">
        @foreach($product->getProductColor as $key=>$value)
            @if($color_id==0) <?php if (get_first_color_id($product->getWarranty,$value->getColor->id)) $color_id=$value->getColor->id  ?> @endif
            @if(check_has_color_in_warranty_list($product->getWarranty,$value->getColor->id))
                <li class="color_li @if($color_id==$value->getColor->id) active @endif" data="{{$value->getColor->id}}">
                    <label for="">
                        <span class="ui-variant-shape" style="background: {{$value->getColor->code}}"></span>
                        <span class="color_name">{{$value->getColor->name}}</span>
                    </label>
                </li>
            @endif
        @endforeach
    </ul>
    <p class="info_item_product">


        <span class="fa fa-check-square"></span>
        @foreach($product->getWarranty as $key=>$value )
            @if($color_id>0)
                @if($value->color_id==$color_id && $warranty_id==0)
                        <?php
                        $warranty_id=$value->warranty_id;
                        $send_time=$value->send_time;
                        $product_price1=$value->price1;
                        $product_price2=$value->price2;

                        ?>
                    <span style="position:relative;bottom: 1px!important;">{{$value->getWarranty->name}}</span>

                        <span id="offers_time" data="{{ ($value->offers_last_time-time()>0 && $value->offers>0) ?  $value->offers_last_time-time() : 0 }} "></span>


                @endif
            @else
                @if($key==0)
                   <?php
                        $send_time=$value->send_time;
                        $product_price1=$value->price1;
                        $product_price2=$value->price2;
                       ?>
                    <span style="position:relative;bottom: 1px!important;">
                    {{$value->getWarranty->name}}
                    </span>


                        <span id="offers_time" data="{{ ($value->offers_last_time-time()>0 && $value->offers>0) ?  $value->offers_last_time-time() : false }} "></span>



                @endif
            @endif
        @endforeach
    </p>
    <p class="info_item_product">
        <span class="fa fa-ambulance"></span>
        @if($send_time>-1)
            @if($send_time==0)
                <span style="position:relative;bottom: 3px!important;">آماده ارسال</span>
                <span  class="fa fa-question-circle" data-toggle="tooltip" data-placement="top"
                      title="این کالا در انبار فروشنده موجود است.برای ارسال باید تا مدت زمان ذکر شده منتظر بمانید">
                </span>
            @else
                <span style="position:relative!important;bottom: 3px!important;">ارسال از {{replace_number($send_time)}} روز کاری آینده</span>
                <span  class="fa fa-question-circle" data-toggle="tooltip" data-placement="top"
                      title="این کالا در انبار فروشنده موجود است.برای ارسال باید تا مدت زمان ذکر شده منتظر بمانید">
                </span>
            @endif
        @endif
    </p>
    <input type="hidden" name="warranty_id" id="warranty_id" value="{{$warranty_id}}">
    <input type="hidden" name="product_id" id="product_id" value="{{$product->id}}">

    <div style="display: inline-flex;width: 100%">
        <div>
            @if($product_price2!=$product_price1)
                <del>{{replace_number(number_format($product_price1))}}</del>
            @endif
            <span class="final_product_price">{{replace_number(number_format($product_price2))}}تومان</span>
        </div>

        @if($product_price2!=$product_price1)
            <div class="product_discount" data-title="تخفیف">
                    <?php
                    $a=($product_price2/$product_price1)*100;
                    $a=100-$a;
                    $a=round($a);
                    ?>
                {{'%'.replace_number($a)}}
            </div>
        @endif

    </div>

</form>

