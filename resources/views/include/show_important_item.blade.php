@if($product_item_count>0)
<h6 style="margin-right: -15px"> ویژگی های مهم</h6>
<ul class="important_item_ul">
    <?php $i=0;?>
    @foreach ($product_item as $key=>$value )
        @foreach ($value->getChild as $key2=>$value2 )
            @if($value2->show_item==1)
                <li @if($i>4) class="more_important_item" @endif>
                    <span>{{$value2->title}} : </span>
                    <span>
                        @foreach($value2->getValue as $itemValue)
                           @if(strlen($itemValue->item_value)>70)
                                <br>
                            @endif
                            <span class="important_item_value">{{$itemValue->item_value}}</span>
                        @endforeach
                    </span>
                </li>
                    <?php $i++;?>
            @endif
        @endforeach
    @endforeach
</ul>
@if($i>4)
    <p class="show_more_important_item">موارد بیشتر</p>
@endif

@endif

