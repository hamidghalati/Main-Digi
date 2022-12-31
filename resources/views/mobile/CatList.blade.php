<div class="catBox" id="catBox">
    <div id="mySideNav" class="sidenav">
        <img src="{{ url('files/images/logo.svg') }}" alt="">
        <p>{{ env('SHOP_NAME','') }}</p>
        <ul>
            @foreach($catList as $key=>$value)
                <li>
                    <a class="parent_cat">
                        <i class="mdi mdi-plus-circle"></i>
                        <span>{{ $value->name }}</span>
                    </a>
                    @if(sizeof($value->getChild)>0)
                        <div class="li_div">
                            <ul>
                                @foreach($value->getChild as $key2=>$value2)
                                    @if($value2->notShow==0)
                                        <li>
                                            <a @if(sizeof($value2->getChild)==0) href="{{get_cat_url($value2)}}" @endif class="child_cat">
                                                <span>{{$value2->name}}</span>
                                            </a>
                                            <ul>
                                                @foreach($value2->getChild as $key5=>$value5)
                                                    @if($value5->notShow==0)
                                                        <li>
                                                            <a style="color: #515151"
                                                               href="{{get_cat_url($value5)}}">{{$value5->name}}</a>
                                                        </li>
                                                    @endif
                                                @endforeach
                                            </ul>
                                        </li>

                                    @else
                                        @foreach($value2->getChild as $key3=>$value3)
                                            @if($value3->notShow==0)
                                                <li>
                                                    <a @if(sizeof($value3->getChild)==0) href="{{get_cat_url($value3)}}" @endif class="child_cat">
                                                        @if(sizeof($value3->getChild)>0)
                                                            <span class="fa fa-plus-circle"></span>
                                                        @endif
                                                        <span>{{$value3->name}}</span>
                                                    </a>
                                                    <ul>
                                                        @foreach($value3->getChild as $key4=>$value4)
                                                            @if($value4->notShow==0)
                                                                <li>
                                                                    <a style="color: #515151"
                                                                       href="{{get_cat_url($value4)}}">{{$value4->name}}</a>
                                                                </li>
                                                            @endif
                                                        @endforeach
                                                    </ul>
                                                </li>
                                            @endif
                                        @endforeach
                                    @endif
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </li>
            @endforeach
        </ul>
    </div>
</div>
