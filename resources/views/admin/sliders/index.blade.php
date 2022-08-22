@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت اسلایدر','url'=>url('admin/sliders')]]])
    <div class="panel">
        <div class="header">
            مدیریت اسلایدرها

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/sliders','title'=>'  اسلایدر'])

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
                        <th scope="col">عنوان</th>
                        <th scope="col">تصویر</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    ?>
                    @foreach($sliders as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-tada">
                                    <input type="checkbox" name="sliders_id[]" value="{{$value->id}}" class="check_box" />
                                    <div class="state p-danger-o">
                                        <i class="icon mdi mdi-close-outline"></i>
                                        <label></label>
                                    </div>
                                </div>



                            </td>
                            <td>{{replace_number(++$i)}}</td>



                            <td>{{$value->title}}</td>
                            <td>
                                <img src="{{url('files/slider/'.$value->image_url)}}" style="width: 400px;height: 130px" alt="">
                            </td>
                            <td>
                                @if(!$value->trashed())
                                    <a class="btn btn-warning"
                                       href="{{url('admin/sliders/'.$value->id.'/edit')}}">
                                        <i class="fa fa-edit"></i>
                                        ویرایش
                                    </a>
                                @endif

                                    @if($value->trashed())
                                        <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                           title="بازیابی اسلایدر"  onclick="restore_row('{{url('admin/sliders/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این اسلایدر مطمئن هستید؟')">
                                            <i class="fa fa-refresh" ></i>
                                            بازیابی
                                        </span>
                                    @endif
                                    @if(!$value->trashed())
                                        <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                              title="حذف اسلایدر" onclick="del_row('{{url('admin/sliders/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این اسلایدر مطمئن هستید؟')" >
                                             <i class="fa fa-remove" ></i>
                                              حذف اسلایدر
                                        </span>
                                    @else
                                        <span class="btn btn-danger" onclick="del_row('{{url('admin/sliders/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                              title="حذف کامل اسلایدر">
                                             <i class="fa fa-remove" ></i>
                                              حذف اسلایدر
                                        </span>
                                    @endif

                            </td>
                        </tr>





                    @endforeach

                    @if(sizeof($sliders)==0)
                        <tr>
                            <td colspan="5">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$sliders->links()}}


        </div>
    </div>




@endsection
