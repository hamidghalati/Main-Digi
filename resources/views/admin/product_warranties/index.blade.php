@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت تنوع قیمت ها','url'=>url('admin/Product_warranties?product_id='.$product->id)]]])
    <div class="panel">
        <div class="header">
            مدیریت تنوع قیمت  برای:
            <p style="display: contents!important;" class="text-danger text-right">{{$product->title}}</p>

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/Product_warranties','title'=>'تنوع قیمت','querystring'=>['param'=>'product_id','value'=>$product->id]])

        </div>
        <div class="panel_content" >

            @include('include.alert')


            <form action="" method="get" class="search_form">
                @if(isset($_GET['trashed']) && ($_GET['trashed']==true))
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
                        <th scope="col">نام گارانتی</th>
                        <th scope="col">نام فروشنده </th>
                        <th scope="col">قیمت محصول </th>
                        <th scope="col">قیمت محصول(فروش)  </th>
                        <th scope="col">موجودی محصول  </th>
                        <th scope="col">رنگ محصول  </th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    ?>
                    @foreach($product_warranty as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="Product_warranties_id[]" value="{{$value->id}}" class="check_box" />
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>
                            <td>{{$value->getwarranty->name}}</td>
                            <td></td>
                              <td style="min-width: 120px;"><span style="font-size: 15px!important;" class="text-danger">{{replace_number(number_format($value->price1)).'  تومان'}}</span></td>
                              <td><span style="font-size: 15px!important;" class="text-success">{{replace_number(number_format($value->price2)).'  تومان'}}</span></td>
                            <td>{{replace_number($value->product_number)}}</td>
                            <td>
                                @if($value->getColor!=null)
                                    <span>
                                        <span style="@if($value->getColor->name=='سفید') color:#000000 @else color: {{$value->getColor->code}} @endif"> {{$value->getColor->name}}</span>
                                    </span>
                                @endif
                            </td>
                            <td style="min-width: 195px;">
                                @if(!$value->trashed())
                                    <a class="btn btn-warning"
                                       href="{{url('admin/Product_warranties/'.$value->id.'/edit?product_id='.$product->id)}}">
                                        <i class="fa fa-edit"></i>
                                        ویرایش
                                    </a>
                                @endif

                                    @if($value->trashed())
                                        <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                           title="بازیابی "  onclick="restore_row('{{url('admin/Product_warranties/'.$value->id.'?product_id='.$product->id)}}','{{ csrf_token() }}','آیا از بازیابی  مطمئن هستید؟')">
                                            <i class="fa fa-refresh" ></i>
                                            بازیابی
                                        </span>
                                    @endif
                                    @if(!$value->trashed())
                                        <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                              title="حذف " onclick="del_row('{{url('admin/Product_warranties/'.$value->id.'?product_id='.$product->id)}}','{{ csrf_token() }}','آیا از حذف  مطمئن هستید؟')" >
                                             <i class="fa fa-remove" ></i>
                                              حذف
                                        </span>
                                    @else
                                        <span class="btn btn-danger" onclick="del_row('{{url('admin/Product_warranties/'.$value->id.'?product_id='.$product->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                              title="حذف کامل ">
                                             <i class="fa fa-remove" ></i>
                                              حذف کامل
                                        </span>
                                    @endif

                            </td>
                        </tr>





                    @endforeach

                    @if(sizeof($product_warranty)==0)
                        <tr>
                            <td colspan="9">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$product_warranty->links()}}


        </div>
    </div>




@endsection

@section('footer')
    <script>
        $("#sidebarToggle").click();
    </script>
@endsection
