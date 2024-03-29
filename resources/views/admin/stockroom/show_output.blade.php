@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت انبار ها','url'=>url('admin/stockrooms')],
    ['title'=>'لیست خروجی انبار ها','url'=>url('admin/stockroom/output')],
    ['title'=>'خروجی انبار ها','url'=>url('admin/stockroom/output/'.$output['stockroomEvent']->id)],
    ]])
    <div class="panel">
        <div class="header">
            <?php $jdf = new \App\Lib\jdf(); ?>
            محصولات خارج شده از {{ $output['stockroomEvent']->getStockroom->name }} توسط : {{ $output['stockroomEvent']->getUser->name }}

            <div style="margin-left: 15px">
                 {{$jdf->jdate('Y/m/d',$output['stockroomEvent']->time) }} -
                {{$jdf->jdate('H:i:s',$output['stockroomEvent']->time) }}
                <span class="mdi mdi-calendar-check"></span>
            </div>


        </div>
        <div class="panel_content">

            @include('include.alert')


            <form action="" method="get" class="search_form">
                @if(isset($_GET['trashed']) && $_GET['trashed']==true)
                    <input type="hidden" name="trashed" value="true">
                @endif
                <input type="text" name="string" class="form-control" value="{{$req->get('string','')}}"
                       placeholder="کلمه مورد نظر را وارد کنید">
                <button class="btn btn-primary btn_search">جستجو
                </button>

            </form>

            <a href="{{ url('admin/factor/'.$output['stockroomEvent']->id.'/output') }}" class="btn btn-primary" style="margin-bottom: 20px" target="_blank">نمایش فاکتور</a>



        @if(!empty($output['stockroomEvent']->tozihat))
                <div class="tozihat">
                    <span>توضیحات : </span>
                    {{ $output['stockroomEvent']->tozihat }}
                </div>
            @endif

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

                @foreach($output['stockroom_product'] as $key=>$value)
                    <tr>
                        <td>{{ ++$key }}</td>
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


                </tbody>
            </table>


        </div>
    </div>

@endsection


