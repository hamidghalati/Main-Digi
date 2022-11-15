@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت نقد وبررسی','url'=>url('admin/product/review/?product_id='.$product->id)]]])
    <div class="panel">
           <div class="header" >مدیریت نقد و بررسی :
                            {{ $product->title }}
            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/product/review/create?product_id='.$product->id,'title'=>'  نقد و بررسی','queryString'=>['param'=>'product_id','value'=>$product->id]])

        </div>
        <div class="panel_content">

            @include('include.alert')



            <form method="post"  id="data_form">
                @csrf
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ردیف</th>
                        <th scope="col">عنوان نقد و بررسی</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    ?>
                    @foreach($review as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="review_id[]" value="{{$value->id}}" class="check_box" />
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>



                            <td>{{$value->title}}</td>

                            <td>
                                @if(!$value->trashed())
                                    <a class="btn btn-warning"
                                       href="{{url('admin/product/review/'.$value->id.'/edit?product_id='.$product->id)}}">
                                        <i class="fa fa-edit"></i>
                                        ویرایش نقد و بررسی
                                    </a>
                                @endif

                                @if($value->trashed())
                                    <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                          title="بازیابی نقد و بررسی"  onclick="restore_row('{{url('admin/product/review/'.$value->id.'?product_id='.$product->id)}}','{{ csrf_token() }}','آیا از بازیابی این نقد و بررسی مطمئن هستید؟')">
                                            <i class="fa fa-refresh" ></i>
                                            بازیابی
                                        </span>
                                @endif
                                @if(!$value->trashed())
                                    <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                          title="حذف نقد و بررسی" onclick="del_row('{{url('admin/product/review/'.$value->id.'?product_id='.$product->id)}}','{{ csrf_token() }}','آیا از حذف نقد و بررسی مطمئن هستید؟')" >
                                             <i class="fa fa-remove" ></i>
                                              حذف نقد و بررسی
                                        </span>
                                @else
                                    <span class="btn btn-danger" onclick="del_row('{{url('admin/product/review/'.$value->id.'?product_id='.$product->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                          title="حذف کامل ">
                                             <i class="fa fa-remove" ></i>
                                              حذف نقد و بررسی
                                        </span>
                                @endif

                            </td>
                        </tr>





                    @endforeach

                    @if(sizeof($review)==0)
                        <tr>
                            <td colspan="4">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$review->links()}}


        </div>
    </div>




@endsection

