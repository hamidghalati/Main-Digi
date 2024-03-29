<table class="table table-striped">
    <thead>
    <tr>
        @if(!isset($remove_delete_link))
            <th scope="col">#</th>
        @endif
        <th scope="col">ردیف</th>
        <th scope="col">شماره سفارش</th>
        <th scope="col">زمان ثبت</th>
        <th scope="col">مبلغ سفارش</th>
        <th scope="col">وضعیت سفارش</th>
        <th scope="col">عملیات</th>
    </tr>
    </thead>
    <tbody>
    <?php

    $i = (isset($_GET['page'])) ? (($_GET['page'] - 1) * 10) : 0;
    ?>
    @foreach($orders as $key=>$value)
        <tr>
            @if(!isset($remove_delete_link))
                <td>
                    <div class="pretty p-icon p-smooth">
                        <input type="checkbox" name="orders_id[]" value="{{$value->id}}" class="check_box"/>
                        <div class="state p-danger-o">
                            <i class="icon fa fa-close"></i>
                            <label></label>
                        </div>
                    </div>

                </td>
            @endif
            <td>{{replace_number(++$i)}}</td>
            <td>
                <span
                    class="@if($value->order_read=='no') text-danger @endif">{{replace_number($value->order_id)}}</span>
            </td>
            <td> {{replace_number(verta($value->created_at)->formatJalaliDatetime())}}</td>
            <td>
                                <span class="alert alert-primary" style="padding: 5px 10px">
                                    {{replace_number(number_format($value['price']))}} تومان
                                </span>
            </td>
            <td>
                @if($value['pay_status']=='awaiting_payment')
                    <span class="alert alert-warning" style="padding: 5px 10px">در انتظار پرداخت</span>
                @elseif($value['pay_status']=='ok')
                    <span class="alert alert-success" style="padding: 5px 10px">  پرداخت شده</span>
                @elseif($value['pay_status']=='canceled')
                    <span class="alert alert-warning" style="padding: 5px 10px">  لغو شده</span>
                @else
                    <span class="alert alert-danger" style="padding: 5px 10px">  خطا در پرداخت</span>
                @endif
            </td>
            <td>
                @if(!$value->trashed())
                    <a class="btn btn-primary"
                       href="{{url('admin/orders/'.$value->id)}}">
                        <i class="fa fa-eye"></i>
                        جزئیات سفارش
                    </a>
                @endif

                @if(!isset($remove_delete_link))
                    @if($value->trashed())
                        <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                              title="بازیابی سفارش"
                              onclick="restore_row('{{url('admin/orders/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این سفارش مطمئن هستید؟')">
                                            <i class="fa fa-refresh"></i>
                                            بازیابی
                                        </span>
                    @endif
                    @if(!$value->trashed())
                        <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                              title="حذف  سفارش"
                              onclick="del_row('{{url('admin/orders/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این سفارش مطمئن هستید؟')">
                                             <i class="fa fa-remove"></i>
                                              حذف سفارش
                                        </span>
                    @else
                        <span class="btn btn-danger"
                              onclick="del_row('{{url('admin/orders/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')"
                              data-toggle="tooltip" data-placement="top"
                              title="حذف کامل سفارش">
                                             <i class="fa fa-remove"></i>
                                              حذف سفارش
                                        </span>
                    @endif
                @endif

            </td>
        </tr>

    @endforeach

    @if(sizeof($orders)==0)
        <tr>
            <td colspan="7">رکوردی برای نمایش وجود ندارد</td>
        </tr>
    @endif

    </tbody>
</table>
