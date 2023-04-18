@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت انبار ها','url'=>url('admin/stockrooms')],
    ['title'=>'لیست خروجی های انبار ','url'=>url('admin/stockroom/output')]
    ]])
    <div class="panel">
        <div class="header">
            لیست خروجی های انبار
        </div>
        <div class="panel_content">

            @include('include.alert')


            <form action="" method="get" class="search_form" id="auto_width">
                <div class="form-group" style="margin-bottom: 0!important;">
                    {{ Form::select('stockroom_id', $stockroom,$req->get('stockroom_id',''),['class'=>'selectpicker','data-live-search'=>'true'])}}
                </div>
                <button class="btn btn-primary btn_search">جستجو
                </button>

            </form>

            <a href="{{ url('admin/stockroom/add/output') }}" class="btn btn-success add_btn">
                <span class="mdi mdi-pencil"></span>
                خارج کردن محصول از انبار
            </a>

            <form method="post" id="data_form">
                @csrf
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ردیف</th>
                        <th scope="col">نام انبار</th>
                        <th scope="col"> اضافه شده توسط</th>
                        <th scope="col"> تعداد محصولات اضافه شده</th>
                        <th scope="col">تاریخ ثبت</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php
                    $jdf = new \App\Lib\jdf();
                    $i = (isset($_GET['page'])) ? (($_GET['page'] - 1) * 10) : 0;
                    ?>
                    @foreach($stockroomEvent as $key=>$value)
                        <tr>
                            <td>{{replace_number(++$i)}}</td>


                            <td>{{$value->getStockroom->name}}</td>
                            <td>{{$value->getUser->name}}</td>
                            <td>{{$value->product_count}}</td>
                            <td>
                                <span>
                                   {{$jdf->jdate('Y-m-d',$value->time) }}
                                </span>
                                <p>
                                    {{$jdf->jdate('H:i:s',$value->time) }}
                                </p>

                            </td>
                            <td>


                                <a href="{{ url('admin/stockroom/output/'.$value->id) }}">
                                    <span data-toggle="tooltip" data-placement="top" title="لیست محصولات موجود">
                                            <i class="fa fa-list"></i>
                                    </span>
                                </a>
                            </td>
                        </tr>

                    @endforeach

                    @if(sizeof($stockroomEvent)==0)
                        <tr>
                            <td colspan="6">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$stockroomEvent->links()}}


        </div>
    </div>

@endsection


