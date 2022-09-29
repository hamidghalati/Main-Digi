@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت سفارشات','url'=>url('admin/orders')]]])
    <div class="panel">
        <div class="header">
            مدیریت سفارشات

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/orders','title'=>'سفارش'])

        </div>
        <div class="panel_content">

            @include('include.alert')


            <form action="" method="get" class="search_form order_search">
                @if(isset($_GET['trashed']) && $_GET['trashed']==true)
                    <input type="hidden" name="trashed" value="true">
                @endif
                <input autocomplete="off" type="text" name="order_id" class="form-control" value="{{$req->get('order_id','')}}" placeholder="شماره سفارش مورد نظر را وارد کنید">
                <input autocomplete="off" type="text" name="first_date" class="form-control pdate" id="pcal1" value="{{$req->get('first_date','')}}" placeholder="از تاریخ ">
                <input autocomplete="off" type="text" name="end_date" class="form-control pdate" id="pcal2" value="{{$req->get('end_date','')}}" placeholder="تا تاریخ">
                <button class="btn btn-primary btn_search">جستجو
                </button>

            </form>

            <?php

            use Hekmatinasser\Verta\Verta;

            $v = new Verta();
            ?>
            <form method="post"  id="data_form">
                @csrf
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
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

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    ?>
                    @foreach($orders as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="category_id[]" value="{{$value->id}}" class="check_box" />
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>
                            <td>
                                <span class="@if($value->order_read=='no') text-danger @endif" >{{replace_number($value->order_id)}}</span>
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


                                @if($value->trashed())
                                    <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                          title="بازیابی سفارش"  onclick="restore_row('{{url('admin/orders/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این سفارش مطمئن هستید؟')">
                                            <i class="fa fa-refresh" ></i>
                                            بازیابی
                                        </span>
                                @endif
                                @if(!$value->trashed())
                                    <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                          title="حذف  سفارش" onclick="del_row('{{url('admin/orders/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این سفارش مطمئن هستید؟')" >
                                             <i class="fa fa-remove" ></i>
                                              حذف سفارش
                                        </span>
                                @else
                                    <span class="btn btn-danger" onclick="del_row('{{url('admin/orders/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                          title="حذف کامل سفارش">
                                             <i class="fa fa-remove" ></i>
                                              حذف سفارش
                                        </span>
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
            </form>


            {{$orders->links()}}


        </div>
    </div>




@endsection

@section('header')
    <link rel="stylesheet" href="{{asset('css/jspc-gray.css')}}">
@endsection

@section('footer')
    <script type="text/javascript" src="{{asset('js/js-persian-cal.min.js')}}"></script>

    <script>
        const pcal1=new AMIB.persianCalendar('pcal1');
        const pcal2=new AMIB.persianCalendar('pcal2');
    </script>
@endsection
