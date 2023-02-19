<?php $jdf = new \App\Lib\jdf() ?>
<table class="table table-striped product_list_table">
    <thead>
    <tr>
        <th>#</th>
        <th>شماره سفارش</th>
        <th>تاریخ ثبت سفارش</th>
        <th>مبلغ قابل پرداخت</th>
        <th>مبلغ کل</th>
        <th>عملیات پرداخت</th>
        <th>جزئیات</th>
    </tr>
    </thead>
    <tbody>
    @foreach($orders as $key=>$value)

        <tr>
            <td>{{replace_number(++$key)}}</td>
            <td>{{replace_number($value->order_id)}}</td>
            <td>
                {{replace_number(verta($value->created_at)->format('j F Y' ))}}
                {{--                             <p>ساعت : {{replace_number(verta($value->created_at)->format('H:i:s'))}}  </p>--}}
            </td>
            <td>{{replace_number(number_format($value->price))}} تومان</td>
            <td>{{replace_number(number_format($value->total_price))}} تومان</td>
            <td>
                @if($value['pay_status']=='awaiting_payment')
                    در انتظار پرداخت
                @elseif($value['pay_status']=='ok')
                    پرداخت شده
                @elseif($value['pay_status']=='canceled')
                    لغو شده
                @else
                    خطا در پرداخت
                @endif
            </td>
            <td>
                <a href="{{url('user/profile/orders/'.$value->id)}}">
                    <span class="fa fa-bar-chart"></span>
                </a>
            </td>

        </tr>
    @endforeach
    </tbody>
</table>
