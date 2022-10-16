@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت کدهای تخفیف','url'=>url('admin/discount')]]])
    <div class="panel">
        <div class="header">
            مدیریت کدهای تخفیف

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/discount','title'=>'کد تخفیف'])

        </div>
        <div class="panel_content">

            @include('include.alert')


            <form action="" method="get" class="search_form">
                @if(isset($_GET['trashed']) && $_GET['trashed']==true)
                    <input type="hidden" name="trashed" value="true">
                @endif
                <input type="text" name="string" class="form-control" value="{{$req->get('string','')}}" placeholder="کد تخفیف مورد نظر را وارد کنید">
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
                        <th scope="col">کد تخفیف</th>
                        <th scope="col">میزان تخفیف</th>
                        <th scope="col">تاریخ انقضا</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                    $jdf=new \App\Lib\Jdf();
                    ?>
                    @foreach($discount as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="discount_id[]" value="{{$value->id}}" class="check_box" />
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>
                            <td>{{$value->code}}</td>
                            <td>
                                @if(!empty($value->amount_discount))
                                    {{replace_number(number_format($value->amount_discount))}} تومان
                                @else
                                    {{replace_number($value->amount_percent)}}  %
                                @endif
                            </td>
                            <td>
                                {{$jdf->jdate('Y-n-j',$value->expire_time)}}
                            </td>
                            <td>

                                @if(!$value->trashed())
                                    <a class="btn btn-warning"
                                       href="{{url('admin/discount/'.$value->id.'/edit')}}">
                                        <i class="fa fa-edit"></i>
                                        ویرایش
                                    </a>
                                @endif

                                    @if($value->trashed())
                                        <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                           title="بازیابی کد تخفیف"  onclick="restore_row('{{url('admin/discount/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی کد تخفیف مطمئن هستید؟')">
                                            <i class="fa fa-refresh" ></i>
                                            بازیابی
                                        </span>
                                    @endif
                                    @if(!$value->trashed())
                                        <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                              title="حذف کد تخفیف" onclick="del_row('{{url('admin/discount/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف کد تخفیف مطمئن هستید؟')" >
                                             <i class="fa fa-remove" ></i>
                                              حذف کد تخفیف
                                        </span>
                                    @else
                                        <span class="btn btn-danger" onclick="del_row('{{url('admin/discount/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                              title="حذف کامل کد تخفیف">
                                             <i class="fa fa-remove" ></i>
                                              حذف کد تخفیف
                                        </span>
                                    @endif

                            </td>
                        </tr>





                    @endforeach

                    @if(sizeof($discount)==0)
                        <tr>
                            <td colspan="6">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$discount->links()}}


        </div>
    </div>




@endsection
