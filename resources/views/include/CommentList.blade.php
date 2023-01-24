<form method="post" id="data_form">
    @csrf

    @php $jdf=new \App\Lib\jdf(); $scoreType=\App\CommentScore::getScoreTypeLabel();@endphp

    @foreach($comments as $comment)
        <div class="comment_box @if($comment->status==1) Accepted @else pending_approval @endif">
            <div class="comment_header_box">
                <div>
                    @if(!isset($remove_delete_link))
                        <div class="pretty p-icon p-smooth">
                            <input type="checkbox" name="comments_id[]" value="{{$comment->id}}" class="check_box"/>
                            <div class="state p-danger-o">
                                <i class="icon fa fa-close"></i>
                                <label></label>
                            </div>
                        </div>
                    @endif

                    <span class="comment_status" comment-id="{{ $comment->id }}"
                          comment-status="{{ $comment->status }}">
                        @if($comment->status==1)
                            تایید شده
                        @else
                            در انتظار تایید
                        @endif
                    </span>

                </div>

                <div>
                    <span>ثبت شده توسط</span>
                    @if($comment->getUserInfo)
                        {{$comment->getUserInfo->first_name.' '.$comment->getUserInfo->last_name}}
                    @else
                        <span>ناشناس</span>
                    @endif

                    <span>در تاریخ</span>
                    <span>{{$jdf->jdate('d F Y',$comment->time)}}</span>

                </div>

                <div>
                    @if(!isset($remove_delete_link))
                        @if(!$comment->trashed())
                            <span data-toggle="tooltip" data-placement="top"
                                  title="حذف نظر"
                                  onclick="del_row('{{url('admin/comments/'.$comment->id)}}','{{ csrf_token() }}','آیا از حذف این نظر مطمئن هستید؟')">
                                             <i style="font-size: 20px;cursor: pointer"
                                                class="mdi mdi-trash-can-outline"></i>

                            </span>
                        @else
                            <span class="btn btn-danger"
                                  onclick="del_row('{{url('admin/comments/'.$comment->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')"
                                  data-toggle="tooltip" data-placement="top"
                                  title="حذف کامل نظر">
                                             <i class="fa fa-remove"></i>
                                              حذف نظر
                            </span>
                        @endif

                        @if($comment->trashed())
                            <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                  title="بازیابی نظر"
                                  onclick="restore_row('{{url('admin/comments/'.$comment->id)}}','{{ csrf_token() }}','آیا از بازیابی این نظر مطمئن هستید؟')">
                                            <i class="fa fa-refresh"></i>
                                            بازیابی
                                </span>
                        @endif

                    @endif
                </div>

            </div>

            <div class="row">

                <div class="col-md-6">
                    <ul class="rating_ul">
                        @foreach(getScoreItem($comment->getScore,$scoreType) as $item)
                            <li>
                                <label for="">{{$item['label']}}</label>
                                <div class="rating" data-rate-digital="{{ $item['type'] }}">
                                    <div class="rating-value" style="width: {{ $item['value']*25 }}%"></div>
                                </div>
                            </li>
                        @endforeach
                    </ul>

                    @if($comment->order>0)
                        <div class="message_purchased">
                            <a target="_blank" href="{{ url('admin/orders/'.$comment->order) }}">
                                <span class="fa fa-shopping-cart"></span>
                                خریدار محصول
                            </a>
                        </div>
                    @endif


                    <span>ثبت شده در محصول :</span>
                    <p>{{ $comment->getProduct->title }}</p>

                </div>

                <div class="col-md-6">
                    {{$comment->title}}
                    <div class="row">
                        <div class="col-md-6">
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
                        </div>

                        <div class="col-md-6">
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

                    </div>
                    <div class="comment_content">{{$comment->content}}</div>
                </div>
            </div>

        </div>
    @endforeach

    @if(sizeof($comments)==0)
        <p style="padding-top: 30px;padding-bottom: 20px;text-align: center">رکوردی برای نمایش یافت نشد</p>
    @endif

</form>
