@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت  صفحات اضافی','url'=>url('admin/pages')]]])
    <div class="panel">
        <div class="header">
            مدیریت صفحات اضافی

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/pages','title'=>' صفحه'])

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
                        <th scope="col">عنوان صفحه</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i = (isset($_GET['page'])) ? (($_GET['page'] - 1) * 10) : 0;
                    ?>
                    @foreach($pages as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="pages_id[]" value="{{$value->id}}" class="check_box"/>
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>
                            <td width="30%" style="font-family: iransans">{{$value->title}}</td>
                            <td>
                                @if(!$value->trashed())
                                    <a
                                        href="{{url('admin/pages/'.$value->id.'/edit')}}">
                                        <span data-toggle="tooltip" data-placement="top" title="ویرایش محصول"><i
                                                class="fa fa-edit"></i></span>

                                    </a>
                                @endif

                                    <a target="_blank"
                                        href="{{url('page/'.$value->url)}}">
                                        <span data-toggle="tooltip" data-placement="top"  title="نمایش صفحه" ><i class="fa fa-file text-success"></i></span>
                                    </a>


                                @if($value->trashed())
                                    <span data-toggle="tooltip" data-placement="top"
                                          title="بازیابی صفحه"
                                          onclick="restore_row('{{url('admin/pages/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این صفحه مطمئن هستید؟')">
                                            <i class="fa fa-refresh"></i>

                                        </span>
                                @endif
                                @if(!$value->trashed())
                                    <span data-toggle="tooltip" data-placement="top"
                                          title="حذف صفحه"
                                          onclick="del_row('{{url('admin/pages/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این صفحه مطمئن هستید؟')">
                                             <i class="fa fa-trash-restore"></i>

                                        </span>
                                @else
                                    <span
                                        onclick="del_row('{{url('admin/pages/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')"
                                        data-toggle="tooltip" data-placement="top"
                                        title="حذف کامل صفحه">
                                             <i class="fa fa-remove"></i>
                                        </span>
                                @endif



                            </td>
                        </tr>

                    @endforeach

                    @if(sizeof($pages)==0)
                        <tr>
                            <td colspan="4">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$pages->links()}}


        </div>
    </div>

@endsection
