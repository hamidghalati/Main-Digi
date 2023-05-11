<!doctype html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>فاکتور</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @yield('header')
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">

    <style>
        body {
            background-color: white !important;
        }
    </style>

</head>
<body>
<?php $jdf = new \App\Lib\jdf();$count = 7;$size = sizeof($input['stockroom_product']);$n = ceil($size / $count);?>

@for($i=0;$i<$n;$i++)
    <div class="container factor print_page">
        <div class="line"></div>
        <div class="header_factor">
            @php $p=$i+1 @endphp
            <div>
                <p>
                    <span>تاریخ :{{$jdf->jdate('Y/m/d') }} - {{$jdf->jdate('H:i:s') }}</span>
                    <span>شماره فاکتور : {{ $input['stockroomEvent']->id }}</span>
                    <span>تعداد محصول : {{ replace_number(sizeof($input['stockroom_product'])) }}</span>
                    <span>
                        @if($n!=1)
                            <span>صفحه {{ replace_number($p) }} از {{ replace_number($n) }} </span>
                        @endif
                    </span>
                </p>
            </div>
            <div class="title">
                @if($type=="input")
                    ورود کالا به انبار
                @else
                    خروج کالا از انبار
                @endif
            </div>
            <div>
                <img src="{{asset(env('SHOP_LOGO','files/images/logo.svg'))}}" alt="" class="shop_logo">
            </div>
        </div>
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
                $j =  (($i - 0) * $count) ;
                ?>
            @foreach($input['stockroom_product'] as $key=>$value)

                @if($key>=$j && $key<$j+$count)
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
                @endif
            @endforeach


            </tbody>
        </table>


{{--        @if($i==($n-1))--}}
            <div class="factor_tozihat">
                <span>کالاهای فوق توسط  : </span>
                {{ $input['stockroomEvent']->getUser->name }}
                <span>
                 @if($type=="input")
                        به  {{ $input['stockroomEvent']->getStockroom->name }} اضافه شده
                    @else
                        از  {{ $input['stockroomEvent']->getStockroom->name }}  خارج شده
                    @endif
            </span>
            </div>

            <div class="factor_footer">
        <span>
            مهر و امضای تحویل گیرنده
        </span>
                <span>
            مهر و امضای تحویل دهنده
        </span>
            </div>
{{--        @endif--}}


    </div>
@endfor

</body>
</html>
