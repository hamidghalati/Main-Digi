<div class="index-cat-list container-fluid">
    <ul>
        <li class="cat_hover">
            <div></div>
        </li>
        @foreach($catList as $key=>$value)
            <li class="cat_item">
                <a href="{{url('main/'.$value->url)}}">{{$value->name}}</a>
                @if(sizeof($value->getChild)>0)
                <div class="li_div">
                    <?php
                    $c = 0
                    ?>
                    @if(sizeof($value->getChild)>0)
                        @if($c==0)
                            <ul class="list-inline sublist"> @endif @endif
                                @foreach($value->getChild as $key2=>$value2)
                                    @if($value2->notShow==0)

                                        @if(get_show_category_count($value2->getChild)>=(14-$c)) <?php $c = 0?></ul><ul class="list-inline sublist">@endif
                                <li>
                                    <a  href="{{get_cat_url($value2)}}" class="child_cat">
                                        <span class="fa fa-angle-left"></span>
                                        <span>{{$value2->name}}</span>

                                    </a>
                                    <ul>
                                        @foreach($value2->getChild as $key5=>$value5)
                                            @if($value5->notShow==0)
                                        <li>
                                                    <a href="{{get_cat_url($value5)}}">{{$value5->name}}</a>
                                                </li>
                                                <?php $c++?>
                                            @endif
                                        @endforeach
                                    </ul>
                                </li>
                                <?php $c++?>
                                @if($c==13) </ul> <? $c = 0?><ul class="list-inline sublist">@endif

                                @else
                                    @foreach($value2->getChild as $key3=>$value3)
                                        @if(get_show_category_count($value3->getChild)>=(14-$c)) <?php $c = 0?></ul><ul class="list-inline sublist">@endif


                                @if($value3->notShow==0)
                                    <li>
                                        <a href="{{get_cat_url($value3)}}" class="child_cat">
                                            <span class="fa fa-angle-left"></span>
                                            <span>{{$value3->name}}</span>

                                        </a>
                                        <ul>
                                            @foreach($value3->getChild as $key4=>$value4)
                                                @if($value4->notShow==0)
                                                    <li>
                                                        <a href="{{get_cat_url($value4)}}">{{$value4->name}}</a>
                                                    </li>
                                                    <?php $c++?>
                                                @endif
                                            @endforeach
                                        </ul>
                                    </li>
                                    <?php $c++?>
                                    @if($c==13) </ul> <? $c = 0?> <ul class="list-inline sublist"> @endif


                    @endif
                    @endforeach
                    @endif
                    @endforeach

                    @if ($c!=0 && get_show_category_count($value->getChild)>0) </ul>@endif




                    <div class="show-total-sub-cat">
                        <a href="">
                            <span>مشاهده تمام دسته های</span>
                            <span>{{ $value->name }}</span>
                        </a>
                    </div>
                        @if(!empty($value->img))
                                <a href="">
                                    <div class="sub-menu-pic">
                                        <img src="{{url('files/upload/'.$value->img)}}" alt="">
                                    </div>
                                </a>

                        @endif


                </div>
                @endif
            </li>
            <?php $c++?>
    @endforeach
            <li class="float-left">
                <a href="">فروش ویژه</a>
            </li>
    </ul>
</div>




