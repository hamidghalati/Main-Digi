@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>' مدیریت محصولات مرجوعی','url'=>url('admin/orders/return-product')]]])
    <div class="panel">
        <div class="header">
            مدیریت محصولات مرجوعی

{{--            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/return-product','title'=>'  محصولات برگشت خورده'])--}}

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
                        <th scope="col">ردیف</th>
                        <th scope="col">تصویر محصول</th>
                        <th scope="col">اطلاعات محصول</th>
                        <th scope="col">قیمت فروش</th>
                        <th scope="col">فروشنده</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    ?>
                    @foreach($return_product_list as $key=>$value)
                        <tr>

                            <td>{{replace_number(++$i)}}</td>
                            <td>  <img src="{{ url('files/thumb/'.$value->getProduct->image_url) }}" alt=""></td>
                            <td></td>
                            <td>
{{--                                @if(!$value->trashed())--}}
{{--                                    <a class="btn btn-primary"--}}
{{--                                       href="{{url('admin/category/'.$value->id.'/filters')}}">--}}
{{--                                        <i class="fa fa-filter"></i>--}}
{{--                                        فیلتر--}}
{{--                                    </a>--}}
{{--                                @endif--}}
{{--                                @if(!$value->trashed())--}}
{{--                                    <a class="btn btn-warning"--}}
{{--                                       href="{{url('admin/category/'.$value->id.'/edit')}}">--}}
{{--                                        <i class="fa fa-edit"></i>--}}
{{--                                        ویرایش--}}
{{--                                    </a>--}}
{{--                                @endif--}}

{{--                                @if($value->trashed())--}}
{{--                                    <span class="btn btn-info" data-toggle="tooltip" data-placement="top"--}}
{{--                                          title="بازیابی گروه محصولات"  onclick="restore_row('{{url('admin/category/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی این دسته مطمئن هستید؟')">--}}
{{--                                            <i class="fa fa-refresh" ></i>--}}
{{--                                            بازیابی--}}
{{--                                        </span>--}}
{{--                                @endif--}}
{{--                                @if(!$value->trashed())--}}
{{--                                    <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"--}}
{{--                                          title="حذف گروه محصولات" onclick="del_row('{{url('admin/category/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این دسته مطمئن هستید؟')" >--}}
{{--                                             <i class="fa fa-remove" ></i>--}}
{{--                                              حذف گروه محصولات--}}
{{--                                        </span>--}}
{{--                                @else--}}
{{--                                    <span class="btn btn-danger" onclick="del_row('{{url('admin/category/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"--}}
{{--                                          title="حذف کامل گروه محصولات">--}}
{{--                                             <i class="fa fa-remove" ></i>--}}
{{--                                              حذف گروه محصولات--}}
{{--                                        </span>--}}
{{--                                @endif--}}

                            </td>
                        </tr>





                    @endforeach

                    @if(sizeof($return_product_list)==0)
                        <tr>
                            <td colspan="6">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$return_product_list->links()}}


        </div>
    </div>




@endsection
