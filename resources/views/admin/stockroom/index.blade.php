@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت انبار ها','url'=>url('admin/stockrooms')]]])
    <div class="panel">
        <div class="header">
            مدیریت انبار ها

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/stockrooms','title'=>'  انبار'])

        </div>
        <div class="panel_content">

            @include('include.alert')


            <form action="" method="get" class="search_form">
                @if(isset($_GET['trashed']) && $_GET['trashed']==true)
                    <input type="hidden" name="trashed" value="true">
                @endif
                <input type="text" name="string" class="form-control" value="{{$req->get('string','')}}"
                       placeholder="کلمه مورد نظر را وارد کنید">
                <button class="btn btn-primary btn_search">جستجو
                </button>

            </form>

            <form method="post" id="data_form">
                @csrf
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ردیف</th>
                        <th scope="col">نام انبار</th>
                        <th scope="col"> آدرس انبار</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i = (isset($_GET['page'])) ? (($_GET['page'] - 1) * 10) : 0;
                    ?>
                    @foreach($stockroom as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="stockrooms_id[]" value="{{$value->id}}"
                                           class="check_box"/>
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>


                            <td>{{$value->name}}</td>
                            <td>{{$value->address}}</td>
                            <td>
                                @if(!$value->trashed())
                                    <a href="{{url('admin/stockrooms/'.$value->id.'/edit')}}">
                                    <span  data-toggle="tooltip" data-placement="top" title="ویرایش انبار">
                                            <i class="fa fa-edit text-success"></i>
                                    </span>

                                    </a>
                                @endif

                                @if($value->trashed())
                                    <span data-toggle="tooltip" data-placement="top"
                                          title="بازیابی "
                                          onclick="restore_row('{{url('admin/stockrooms/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این انبار مطمئن هستید؟')">
                                            <i class="fa fa-refresh text-warning"></i>
                                        </span>
                                @endif


                                <a href="{{ url('admin/stockrooms/'.$value->id) }}">
                                    <span  data-toggle="tooltip" data-placement="top" title="لیست محصولات موجود">
                                            <i class="fa fa-list"></i>
                                    </span>
                                </a>


                                @if(!$value->trashed())
                                    <span  data-toggle="tooltip" data-placement="top"
                                          title="حذف انبار"
                                          onclick="del_row('{{url('admin/stockrooms/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این انبار مطمئن هستید؟')">
                                             <i class="fa fa-trash-restore text-danger"></i>
                                        </span>
                                @else
                                    <span
                                          onclick="del_row('{{url('admin/stockrooms/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')"
                                          data-toggle="tooltip" data-placement="top"
                                          title="حذف کامل انبار">
                                             <i class="fa fa-remove text-danger"></i>
                                        </span>
                                @endif

                            </td>
                        </tr>

                    @endforeach

                    @if(sizeof($stockroom)==0)
                        <tr>
                            <td colspan="6">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$stockroom->links()}}


        </div>
    </div>

@endsection


