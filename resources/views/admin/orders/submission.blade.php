@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>$label,'url'=>url('admin/orders/'.$label_url)]]])
    <div class="panel">
        <div class="header">
            {{$label}}


        </div>
        <div class="panel_content">

    @include('include.alert')


            <form action="" method="get" class="search_form">
                <input autocomplete="off" type="text" name="submission_id" class="form-control" value="{{$req->get('submission_id','')}}" placeholder="شماره مرسوله مورد نظر را وارد کنید">
                <button class="btn btn-primary btn_search">جستجو
                </button>
            </form>

            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ردیف</th>
                    <th scope="col">کد مرسوله</th>
                    <th scope="col">تاریخ ثبت</th>
                    <th scope="col">تعداد کالا</th>
                    <th scope="col">وضعیت مرسوله</th>
                    <th scope="col">عملیات</th>
                </tr>
                </thead>
                <tbody>
                <?php

                 $jdf=new \App\Lib\Jdf();
                $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                $orderStatus = \App\Order::orderStatus();
                ?>
                @foreach($submission as $key=>$value)
                    <?php   $i++;$e=explode(' ',$value->created_at);$e2=explode('-',$e[0])  ?>
                    <tr>

                        <td>{{replace_number($i)}}</td>
                        <td>{{replace_number($value->id)}}</td>
                        <td>{{replace_number($jdf->gregorian_to_jalali($e2[0],$e2[1],$e2[2],'/'))}}</td>
                        <td>{{replace_number(getOrderProductCount($value->product_id))}}</td>
                        <td>
                            @if(array_key_exists($value->send_status,$orderStatus))
                                {{$orderStatus[$value->send_status]}}
                            @endif
                        </td>

                        <td>
                            <a class="btn btn-primary"
                               href="{{url('admin/orders/submission/'.$value->id)}}">
                                <i class="fa fa-eye"></i>
                                جزئیات سفارش
                            </a>
                        </td>
                    </tr>





                @endforeach

                @if(sizeof($submission)==0)
                    <tr>
                        <td colspan="6">رکوردی برای نمایش وجود ندارد</td>
                    </tr>
                @endif

                </tbody>
            </table>


            {{$submission->links()}}



        </div>
    </div>

@endsection
