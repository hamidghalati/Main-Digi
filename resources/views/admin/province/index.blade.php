@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت استان ها','url'=>url('admin/province')]]])
    <div class="panel">
        <div class="header">
            مدیریت استان ها

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/province','title'=>'  استان'])

        </div>
        <div class="panel_content">

            @include('include.alert')


            <form action="" method="get" class="search_form">
                @if(isset($_GET['trashed']) && $_GET['trashed']==true)
                    <input type="hidden" name="trashed" value="true">
                @endif
                <input type="text" name="string" class="form-control" value="{{$req->get('string','')}}" placeholder="کلمه مورد نظر را وارد کنید">
                <button class="btn btn-primary btn_search">جستجو
                </button>

            </form>

            <form method="post"  id="data_form">
                @csrf
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ردیف</th>
                        <th scope="col">نام استان</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    ?>
                    @foreach($province as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="province_id[]" value="{{$value->id}}" class="check_box" />
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>



                            <td>{{$value->name}}</td>
                            <td>
                                @if(!$value->trashed())
                                    <a class="btn btn-warning"
                                       href="{{url('admin/province/'.$value->id.'/edit')}}">
                                        <i class="fa fa-edit"></i>
                                        ویرایش
                                    </a>
                                @endif

                                @if($value->trashed())
                                    <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                          title="بازیابی استان"  onclick="restore_row('{{url('admin/province/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این استان مطمئن هستید؟')">
                                            <i class="fa fa-refresh" ></i>
                                            بازیابی
                                        </span>
                                @endif
                                @if(!$value->trashed())
                                    <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                          title="حذف استان" onclick="del_row('{{url('admin/province/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این استان مطمئن هستید؟')" >
                                             <i class="fa fa-remove" ></i>
                                              حذف استان
                                        </span>
                                @else
                                    <span class="btn btn-danger" onclick="del_row('{{url('admin/province/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                          title="حذف کامل استان">
                                             <i class="fa fa-remove" ></i>
                                              حذف استان
                                        </span>
                                @endif

                            </td>
                        </tr>





                    @endforeach

                    @if(sizeof($province)==0)
                        <tr>
                            <td colspan="6">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$province->links()}}


        </div>
    </div>




@endsection

