<div class="product_item_box">
    <div style="padding: 15px">
        <div class="item_box remove_item_box_shadow">
            <span>مفیدترین نظرات</span>
            <a class="add_link" href="{{ url('product/comment/'.$product->id) }}">
                <span>افزودن نظر جدید</span>
                <i class="mdi mdi-plus"></i>
            </a>
        </div>
        @php $jdf=new \App\Lib\jdf(); $scoreType=\App\CommentScore::getScoreTypeLabel();@endphp
        @foreach($useful_comment as $comment )
            <div class="comment_div">
                <span class="user_name">
                     @if($comment->getUserInfo)
                        <span>{{$comment->getUserInfo->first_name.' '.$comment->getUserInfo->last_name}}</span>
                    @else
                        <span>ناشناس</span>
                    @endif
                </span>
                <span class="date">{{$jdf->jdate('d F Y',$comment->time)}}</span>
                <div class="comment_content">{{$comment->content}}</div>
                @php $advantages=$comment->advantage @endphp
                @if(sizeof($advantages)>1)
                    <span class="evaluation_label">نقاط قوت</span>
                    <ul class="evaluation_ul advantage">
                        @foreach($advantages as $advantage)
                            @if(!empty($advantage))
                                <li><span>{{$advantage}}</span></li>
                            @endif
                        @endforeach
                    </ul>
                @endif
                @php $disadvantages=$comment->disadvantage @endphp
                @if(sizeof($disadvantages)>1)
                    <span class="evaluation_label">نقاط ضعف</span>
                    <ul class="evaluation_ul disadvantage">
                        @foreach($disadvantages as $disadvantage)
                            @if(!empty($disadvantage))
                                <li><span>{{$disadvantage}}</span></li>
                            @endif
                        @endforeach
                    </ul>
                @endif
            </div>
        @endforeach

        @if(sizeof($useful_comment)==0)
            <p class="center_message">تاکنون نظری برای این محصول ثبت نشده است</p>
        @endif

        @if($comment_count>2)
            <div class="show_more_div">
                <a class="more_link" id="show_more_comment">
                    <span>مشاهده همه {{ replace_number($comment_count) }}   نظر کاربران</span>
                    <i class="mdi mdi-chevron-left"></i>
                </a>
            </div>
            <mobile-theme-comment-list :product_id="'{{ $product->id }}'" :product_title="'{{ $product->title }}'"></mobile-theme-comment-list>
        @endif

    </div>

</div>
