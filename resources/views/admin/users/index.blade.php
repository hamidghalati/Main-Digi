@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت  کاربران','url'=>url('admin/users')]]])
    <div class="panel">
        <div class="header">
            مدیریت  کاربران

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/users','title'=>' کاربر'])

        </div>
        <div class="panel_content">

            @include('include.alert')

            <?php $jdf=new \App\Lib\jdf(); ?>

            <form action="" method="get" class="search_form">
                @if(isset($_GET['trashed']) && $_GET['trashed']==true)
                    <input type="hidden" name="trashed" value="true">
                @endif
                <input type="text" name="name" class="form-control" value="{{$req->get('name','')}}" placeholder="نام کاربر مورد نظر را وارد کنید">
                <input type="text" name="mobile" class="form-control" value="{{$req->get('mobile','')}}" placeholder="شماره موبایل کاربر مورد نظر را وارد کنید">
                <div id="role">
                    <select name="role" class="selectpicker" >
                        <option  @if($req->get('role','')=='admin') selected="selected" @endif value="admin">مدیر</option>
                        <option  @if($req->get('role','')=='user') selected="selected" @endif value="user">کاربر عادی</option>
                        @foreach($roles  as $role)
                            <option @if($req->get('role','')==$role->id ) selected="selected" @endif value="{{ $role->id }}">{{ $role->name }}</option>
                        @endforeach

                    </select>
                </div>
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
                        <th scope="col">نام کاربر</th>
                        <th scope="col">شماره موبایل</th>
                        <th scope="col">تاریخ عضویت</th>
                        <th scope="col">وضعیت </th>
                        <th scope="col">نقش کاربری </th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    ?>
                    @foreach($users as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="users_id[]" value="{{$value->id}}" class="check_box" />
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>
                            <td>
                                @if(!empty($value->name))
                                    {{$value->name}}
                                @else
                                   ثبت نشده
                                @endif
                            </td>

                            <td>{{ $value->mobile }}</td>
                            <td>
                                @php
                                    $e=explode(' ',$value->created_at);
                                    $e2=explode('-',$e[0]);
                                @endphp
                                {{ $jdf->gregorian_to_jalali($e2[0],$e2[1],$e2[2],'-') }}
                            </td>
                            <td>
                                @if($value['account_status']=='active')
                                    <span style="padding: 10px" class="badge badge-success">فعال</span>
                                @else
                                    <span style="padding: 10px" class="badge badge-warning">غیرفعال</span>
                                @endif
                            </td>
                            <td>
                                @if($value->getRole)
                                    {{ $value->getRole->name }}
                                @elseif($value->role=='admin')
                                    <span style="padding: 10px" class="badge badge-primary">مدیر</span>
                                @else
                                    <span style="padding: 10px" class="badge badge-info">کاربر عادی</span>
                                @endif
                            </td>





                            <td>
                                @if(!$value->trashed())
                                    <a
                                       href="{{url('admin/users/'.$value->id.'/edit')}}">
                                        <span data-toggle="tooltip" data-placement="top" title="ویرایش کاربر"><i class="fa fa-edit"></i></span>

                                    </a>
                                @endif

                                    <a
                                       href="{{url('admin/users/'.$value->id)}}">
                                        <span data-toggle="tooltip" data-placement="top" title="سفارش های کاربر"><i class="fa fa-eye text-black-50"></i></span>
                                    </a>


                                @if($value->trashed())
                                    <span  data-toggle="tooltip" data-placement="top"
                                          title="بازیابی کاربر"  onclick="restore_row('{{url('admin/users/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این کاربر مطمئن هستید؟')">
                                            <i class="fa fa-refresh text-success" ></i>
                                            بازیابی
                                        </span>
                                @endif
                                @if(!$value->trashed())
                                    <span  data-toggle="tooltip" data-placement="top"
                                          title="حذف کاربر" onclick="del_row('{{url('admin/users/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این کاربر مطمئن هستید؟')" >
                                             <i class="fa fa-trash-restore text-danger" ></i>

                                        </span>
                                @else
                                    <span  onclick="del_row('{{url('admin/users/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                          title="حذف کامل کاربر">
                                             <i class="fa fa-remove" ></i>
                                              حذف
                                        </span>
                                @endif

                            </td>
                        </tr>





                    @endforeach

                    @if(sizeof($users)==0)
                        <tr>
                            <td colspan="8">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$users->links()}}


        </div>
    </div>




@endsection

