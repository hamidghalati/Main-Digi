@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت گروه محصولات','url'=>url('admin/category')]]])
    <div class="panel">
        <div class="header">
            مدیریت گروه محصولات

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/category','title'=>'گروه محصولات'])

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
                        <th scope="col">گروه محصولات</th>
                        <th scope="col">زیر گروه محصولات</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    ?>
                    @foreach($category as $key=>$value)
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
                            <td>{{$value->name}}</td>
                            <td>{{$value->getParent->name}}</td>
                            <td>
                                @if(!$value->trashed())
                                    <a class="btn btn-warning"
                                       href="{{url('admin/category/'.$value->id.'/edit')}}">
                                        <i class="fa fa-edit"></i>
                                        ویرایش
                                    </a>
                                @endif

                                    @if($value->trashed())
                                        <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                           title="بازیابی گروه محصولات"  onclick="restore_row('{{url('admin/category/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این دسته مطمئن هستید؟')">
                                            <i class="fa fa-refresh" ></i>
                                            بازیابی
                                        </span>
                                    @endif
                                    @if(!$value->trashed())
                                        <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                              title="حذف گروه محصولات" onclick="del_row('{{url('admin/category/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این دسته مطمئن هستید؟')" >
                                             <i class="fa fa-remove" ></i>
                                              حذف گروه محصولات
                                        </span>
                                    @else
                                        <span class="btn btn-danger" onclick="del_row('{{url('admin/category/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                              title="حذف کامل گروه محصولات">
                                             <i class="fa fa-remove" ></i>
                                              حذف گروه محصولات
                                        </span>
                                    @endif

                            </td>
                        </tr>





                    @endforeach

                    @if(sizeof($category)==0)
                        <tr>
                            <td colspan="6">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$category->links()}}


        </div>
    </div>




@endsection
