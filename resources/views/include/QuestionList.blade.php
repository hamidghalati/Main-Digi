<form method="post" id="data_form">
    @csrf

    @php $jdf=new \App\Lib\jdf();@endphp

    @foreach($questions as $key=>$value)
        <div class="question_div">
            <div class="question_div_header @if($value->status==0) question-pending-approval @endif">

                <div>
{{--                    <input type="checkbox" name="questions_id[]" class="check_box" value="{{ $value->id }}">--}}

                    <div class="pretty p-icon p-smooth">
                        <input type="checkbox" name="questions_id[]" value="{{$value->id}}" class="check_box"/>
                        <div class="state p-danger-o">
                            <i class="icon fa fa-close"></i>
                            <label></label>
                        </div>
                    </div>


                    <span class="question_status" question_id="{{ $value->id }}" status="{{ $value->status }}"></span>

                    @if($value->status)
                        تایید شده
                    @else
                        در انتظار تایید
                    @endif
                </div>

                <div>
                        <?php $string = 'پرسش'; ?>
                    @if( $value->questions_id==0)
                        <span class="fa fa-question-circle"></span>
                        پرسش
                    @else
                        <span class="fa fa-reply"></span>
                        پاسخ
                            <?php $string = 'پاسخ'; ?>
                    @endif

                    @if($value->getUserInfo)
                        {{$value->getUserInfo->first_name.' '.$value->getUserInfo->last_name}}
                    @else
                        <span>ناشناس</span>
                    @endif

                    <span>در تاریخ</span>
                    <span>{{$jdf->jdate('d F Y',$value->time)}}</span>

                </div>

                <div>
                    @if(!$value->trashed())
                        <span data-toggle="tooltip" data-placement="top"
                              title="حذف <?= $string?>"
                              onclick="del_row('{{url('admin/questions/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این <?= $string?> مطمئن هستید؟')">
                                             <i style="font-size: 20px;cursor: pointer"
                                                class="mdi mdi-trash-can-outline"></i>

                            </span>
                    @else
                        <span class="btn btn-danger"
                              onclick="del_row('{{url('admin/questions/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')"
                              data-toggle="tooltip" data-placement="top"
                              title="حذف کامل <?= $string?>">
                                             <i class="fa fa-remove"></i>
                                              حذف نظر
                            </span>
                    @endif

                    @if($value->trashed())
                        <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                              title="بازیابی <?= $string?>"
                              onclick="restore_row('{{url('admin/questions/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این <?= $string?> مطمئن هستید؟')">
                                            <i class="fa fa-refresh"></i>
                                            بازیابی
                                </span>
                    @endif

                </div>
            </div>

            <div class="question_content">
                {!! $value->questions !!}

                <div style="min-height: 70px">
                    @if($value->questions_id!=0)
                        <div class="main">
                            <p>
                                <span class="fa fa-question"></span>
                                <span>پرسش اصلی</span>
                            </p>
                            {!! $value->getParent->questions !!}
                        </div>
                    @endif
                </div>

                @if($value->questions_id==0)
                    <div class="answer_div">
                        <textarea name="answer" id="answer_{{ $value->id }}" cols="30" rows="10" placeholder="پاسخ شما"></textarea>
                        <a onclick="add_answer('<?= csrf_token() ?>','$value->id')" class="btn btn-success">ثبت پاسخ</a>
                    </div>
                @endif

                <div class="question_footer">
                    <a target="_blank" href="{{ url('product/dkp-'.$value->getProduct->id.'/'.$value->getProduct->product_url) }}">
                        ثبت شده در محصول : {{ $value->getProduct->title }}
                    </a>

                    @if($value->questions_id==0)
                        <span class="add_answer"> ارسال پاسخ به این پرسش</span>
                    @endif

                </div>

            </div>


        </div>
    @endforeach

</form>
