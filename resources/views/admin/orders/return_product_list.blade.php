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
                <input type="text" name="string" class="form-control" value="{{$req->get('string','')}}"
                       placeholder="عنوان محصول را وارد کنید">
                <button class="btn btn-primary btn_search">جستجو
                </button>

            </form>

            <form method="post" id="data_form">
                @csrf
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">ردیف</th>
                        <th scope="col">تصویر محصول</th>
                        <th scope="col">اطلاعات محصول</th>
                        <th scope="col">قیمت فروش</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i = (isset($_GET['page'])) ? (($_GET['page'] - 1) * 10) : 0;
                    ?>
                    @foreach($return_product_list as $key=>$value)
                        <tr>

                            <td>{{replace_number(++$i)}}</td>
                            <td width="20%"><img width="50%" height="50%" id="return_product_list_img" src="{{ url('files/thumb/'.$value->getProduct->image_url) }}" alt=""></td>
                            <td width="50%">
                                <ul class="return_product_info">
                                    <li>{{$value->getProduct->title}}</li>
                                    <li>
                                        <span>فروشنده :</span> {{ $value->getSeller->brand_name }}
                                    </li>
                                    <li>
                                        <span>رنگ : </span> {{ $value->getColor->name }}
                                    </li>
                                    @if(!empty($value->getWarranty->name))
                                        <li>
                                            <span>گارانتی : </span> {{ $value->getWarranty->name }}
                                        </li>
                                    @endif

                                    <li>
                                        <span>تعداد : </span> {{ $value->product_count }}
                                    </li>
                                    @if($value->getStockroom)
                                        <li>
                                            <span>اضافه شده به : </span> {{ $value->getStockroom->name }}
                                        </li>
                                    @endif
                                    @if(!empty($value->tozihat))
                                        <li>
                                            <div class="alert alert-warning">{{ $value->tozihat }}</div>
                                        </li>
                                    @endif


                                </ul>
                            </td>
                            <td>{{ number_format($value->product_price2*$value->product_count) }} تومان </td>
                            <td>
                                    <a
                                       href="{{url('admin/orders/'.$value->getOrder->id)}}" target="_blank">
                                        <span data-toggle="tooltip" data-placement="top" title="جزئیات سفارش"><i style="font-size: 20px;"  class="fa fa-eye"></i></span>

                                    </a>

                                        <span data-toggle="tooltip" data-placement="top" title="حذف محصول از لیست" onclick="show_modal_box('{{$value->getProduct->title}}',{{ $value->id }})">
                                            <i style="font-size: 20px;"  class="mdi mdi-trash-can-outline text-danger"></i>
                                        </span>


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


    <div class="modal" tabindex="-1" role="dialog" id="return_product_box">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">تغییر وضعیت</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form action="{{ url('admin/orders/return-product') }}" method="post">
                    @csrf
                    <div class="modal-body">
                        <div id="message" style="text-align: justify;"></div>
                        <input type="hidden" name="id" id="product_id">
                        <input type="hidden" name="type" id="output" value="output">
                        <textarea name="tozihat" class="tozihat" placeholder="توضیحات"></textarea>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">تایید</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">خروج</button>
                    </div>
                </form>

            </div>
        </div>
    </div>

@endsection
@section('footer')
    <script>
        show_modal_box=function (title,id) {
            document.getElementById('product_id').value=id;
            let message="";
            message+=title+"به عنوان محصول مرجوعی ثبت شده، در صورت تایید وضعیت محصول مجددا به حالت تحویل مشتری تغییر خواهد کرد.";
            $("#message").text(message);
            $("#return_product_box").modal('show');
        }
    </script>
@endsection
