<div class="review_box">

    <h2 class="headline">
        @if(!empty($product->ename)&& $product->ename!='null')
            <span>{{$product->ename}}</span>
        @endif
    </h2>

    @if(!empty($product->tozihat))
        <div class="tozihat">
            <div class="content">
                <div id="product_tozihat">
                    {!! $product->tozihat !!}
                </div>
                <a class="more_content">
                    <span>ادامه مطلب</span>
                </a>
            </div>
        </div>
    @endif


    @foreach($review as $key=>$value)
        @if(empty($value->title))
            <div class="review_tozihat">
                <h4>نقد و بررسی تخصصی</h4>
                {!! $value->tozihat !!}
            </div>
        @endif
    @endforeach
    @foreach($review as $key=>$value)
        @if(!empty($value->title))
            <div class="item_row">
                <button class="expert_button"></button>
                <h3>{{ $value->title }}</h3>
                <div class="content">
                    <?php
                        $find='style="width: 100%;"';
                        $replace='class="review_image"';
                        $tozihat=str_replace($find,$replace,$value->tozihat);
                        ?>
                    {!! $tozihat !!}
                </div>
            </div>
        @endif
    @endforeach
</div>
