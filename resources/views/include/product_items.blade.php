<div class="item_content">
    @if(sizeof($product_item)>0 && $product_item_count>0)
        <h3>مشخصات فنی</h3>
        <table class="item_table">
            @foreach ($product_item as $key=>$value )
                <tr>
                    <td colspan="2" style="padding: 15px 0">
                        <span class="item_name">{{$value->title}}</span>
                    </td>
                </tr>
                @foreach ($value->getChild as $key2=>$value2 )
                    @if(sizeof($value2->getValue)>0)
                        <tr>
                            <td class="product_item_name">
                                <p>{{$value2->title}}</p>
                            </td>
                            <td class="product_item_value">
                                <p>{{$value2->getValue[0]->item_value}}</p>
                            </td>
                        </tr>
                        @foreach ($value2->getValue as $key3=>$value3 )
                            @if($key3>0)
                                <tr>
                                    <td class="product_item_name">
                                    </td>
                                    <td class="product_item_value">
                                        <p>{{$value3->item_value}}</p>
                                    </td>
                                </tr>
                            @endif
                        @endforeach
                    @endif



                @endforeach
            @endforeach



        </table>
    @else
    @endif
</div>
