@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت  محصولات','url'=>url('admin/products')]]])
    <div class="panel">
        <div class="header">
            مدیریت  محصولات

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/products','title'=>' محصولات'])

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
                <?php
                $status=\App\ProductsModel::ProductStatus();
                ?>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ردیف</th>
                        <th scope="col">تصویر محصول</th>
                        <th scope="col">نام محصول</th>
                        <th scope="col">نام فروشنده</th>
                       <th scope="col">وضعیت محصول</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    ?>
                    @foreach($product as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="products_id[]" value="{{$value->id}}" class="check_box" />
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>
                            <td><img src="{{url('files/thumb/'.$value->image_url)}}" class="product_pic" alt=""></td>
                            <td width="30%" style="font-family: iransans">{{$value->title}}</td>
                            <td></td>
                            <td>
                                @if(array_key_exists($value->status,$status))
                                    <span class="alert @if($value->status==1) alert-success @else alert-warning @endif" style="font-size: 13px;padding: 5px 7px">
                                        {{$status[$value->status]}}
                                    </span>
                                @endif
                            </td>
                            <td>
                                @if(!$value->trashed())
                                    <a class="btn btn-warning"
                                       href="{{url('admin/products/'.$value->id.'/edit')}}">
                                        <span data-toggle="tooltip" data-placement="top" title="ویرایش محصول"><i class="fa fa-edit"></i></span>

                                    </a>
                                @endif

                                @if(!$value->trashed())
                                    <a class="btn btn-success"
                                       href="{{url('admin/products/'.$value->id.'/items')}}">
                                        <span data-toggle="tooltip" data-placement="top" title="اضافه کردن آیتم به محصول"><i class="fa fa-bar-chart"></i></span>

                                    </a>
                                @endif

                                    @if(!$value->trashed())
                                        <a class="btn btn-info"
                                           href="{{url('admin/Product_warranties/create?product_id='.$value->id)}}">
                                            <span data-toggle="tooltip" data-placement="top" title="اضافه کردن تنوع قیمت"><i class="fa fa-credit-card"></i></span>

                                        </a>
                                    @endif

                                    @if($value->trashed())
                                        <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                           title="بازیابی محصولات"  onclick="restore_row('{{url('admin/products/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این دسته مطمئن هستید؟')">
                                            <i class="fa fa-refresh" ></i>
                                            بازیابی
                                        </span>
                                    @endif
                                    @if(!$value->trashed())
                                        <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                              title="حذف محصولات" onclick="del_row('{{url('admin/products/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این دسته مطمئن هستید؟')" >
                                             <i class="fa fa-remove" ></i>

                                        </span>
                                    @else
                                        <span class="btn btn-danger" onclick="del_row('{{url('admin/products/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                              title="حذف کامل محصولات">
                                             <i class="fa fa-remove" ></i>
                                              حذف
                                        </span>
                                    @endif

                            </td>
                        </tr>





                    @endforeach

                    @if(sizeof($product)==0)
                        <tr>
                            <td colspan="7">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$product->links()}}


        </div>
    </div>




@endsection
