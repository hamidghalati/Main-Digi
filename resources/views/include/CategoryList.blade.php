<div class="index-cat-list container-fluid">
    <ul>
        @foreach($catList as $key=>$value)
            <li class="cat_item">
                <a href="{{url('main/'.$value->url)}}">
                    {{$value->name}}
                </a>

                  <div class="li_div">
                      <ul class="list-inline sublist">
                      @foreach($value->getChild as $key2=>$value2)
                          @if($value2->notShow==0)

                          @else
                              <li>
                                  <a href="">
                                      <span>{{$value2->name}}</span>
                                  </a>
                              </li>
                          @endif
                      @endforeach
                      </ul>
                  </div>
            </li>
        @endforeach
    </ul>

</div>
