@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت انبار ها','url'=>url('admin/stockrooms')],
    ['title'=>'لیست محصولات','url'=>url('admin/stockroom/'.$stockroom->id)],
    ]])
    <div class="panel">
        <div class="header">
            لیست محصولات موجود در {{ $stockroom->name }}
        </div>
        <div class="panel_content">

            @include('include.alert')


            <form action="" method="get" class="search_form" id="search_form_list">
                <div>
                    {{ Form::select('seller_id', $seller,$req->get('seller',''),['class'=>'selectpicker','data-live-search'=>'true'])}}
                </div>
                <input type="text" name="title" class="form-control" value="{{$req->get('title','')}}"
                       placeholder="کلمه مورد نظر را وارد کنید">
                <button class="btn btn-primary btn_search">جستجو
                </button>

            </form>


            <table class="table table-striped">
                <thead>
                <tr>
                    <th>ردیف</th>
                    <th>تصویر محصول</th>
                    <th>عنوان محصول</th>
                    <th>فروشنده</th>
                    <th>گارانتی</th>
                    <th>رنگ</th>
                    <th>تعداد</th>
                </tr>
                </thead>
                <tbody>
                <?php
                $i = (isset($_GET['page'])) ? (($_GET['page'] - 1) * 10) : 0;
                ?>
                @foreach($inventory_list as $key=>$value)
                    <tr>
                        <td>{{ ++$i }}</td>
                        <td>
                            <img style="width: 70px;"
                                 src="{{ url('files/thumb/'.$value->getProductWarranty->getProduct->image_url) }}"
                                 alt=""
                                 class="product_pic stockroom_product">
                        </td>
                        <td width="30%">{{ $value->getProductWarranty->getProduct->title }}</td>
                        <td>{{ $value->getProductWarranty->getSeller->brand_name }}</td>
                        <td>{{ $value->getProductWarranty->getWarranty->name }}</td>
                        <td>
                            @if($value->getProductWarranty->getColor->id>0)
                                <span style="background: {{ $value->getProductWarranty->getColor->code }}"
                                      class="color_td">
                                   <span style="color: white"> {{ $value->getProductWarranty->getColor->name }}</span>
                                </span>
                            @endif

                        </td>
                        <td>{{ $value->product_count }}</td>
                    </tr>
                @endforeach

                @if(sizeof($inventory_list)==0)
                    <tr>
                        <td colspan="7">رکوردی برای نمایش وجود ندارد</td>
                    </tr>
                @endif


                </tbody>
            </table>
            {{ $inventory_list->links() }}

        </div>
    </div>

@endsection


