@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت کمیسیون ها','url'=>url('admin/commissions')]]])
    <div class="panel">
        <div class="header">
            مدیریت کمیسیون ها

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/commissions','title'=>'کمیسیون'])
        </div>
        <div class="panel_content">

            @include('include.alert')


            <form action="" method="get" class="search_form" id="auto_width">
                @if(isset($_GET['trashed']) && $_GET['trashed']==true)
                    <input type="hidden" name="trashed" value="true">
                @endif
                <div class="form-group" style="margin-bottom: 0!important;">
                    {{ Form::select('cat_id', $category,$req->get('cat_id',''),['class'=>'selectpicker','data-live-search'=>'true'])}}
                </div>
                <div class="form-group" style="margin-bottom: 0!important;">
                    {{ Form::select('brand_id', $brand,$req->get('brand_id',''),['class'=>'selectpicker','data-live-search'=>'true'])}}
                </div>
                <button class="btn btn-primary btn_search">جستجو
                </button>

            </form>

            <a href="{{ url('admin/stockroom/add/input') }}" class="btn btn-success add_btn">
                <span class="mdi mdi-pencil"></span>
                کمیسیون
            </a>

            <form method="post" id="data_form">
                @csrf
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ردیف</th>
                        <th scope="col">نام گروه محصولات</th>
                        <th scope="col"> برند</th>
                        <th scope="col"> درصد کمیسیون</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php
                    $i = (isset($_GET['page'])) ? (($_GET['page'] - 1) * 10) : 0;
                    ?>
                    @foreach($commission as $key=>$value)
                        <tr>
                            <td>

                                <div class="pretty p-icon p-smooth">
                                    <input type="checkbox" name="commissions_id[]" value="{{$value->id}}"
                                           class="check_box"/>
                                    <div class="state p-danger-o">
                                        <i class="icon fa fa-close"></i>
                                        <label></label>
                                    </div>
                                </div>

                            </td>
                            <td>{{replace_number(++$i)}}</td>
                            <td>{{$value->getCategory->name}}</td>
                            <td>{{$value->getBrand->brand_name}}</td>
                            <td>{{$value->percentage.'%'}}</td>
                            <td>

                                @if(!$value->trashed())
                                    <a class="btn btn-warning"
                                       href="{{url('admin/commissions/'.$value->id.'/edit')}}">
                                        <i class="fa fa-edit"></i>
                                        ویرایش
                                    </a>
                                @endif

                                @if($value->trashed())
                                    <span class="btn btn-info" data-toggle="tooltip" data-placement="top"
                                          title="بازیابی کمیسیون"
                                          onclick="restore_row('{{url('admin/commissions/'.$value->id)}}','{{ csrf_token() }}','آیا از بازیابی کمیسیون مطمئن هستید؟')">
                                            <i class="fa fa-refresh"></i>
                                            بازیابی
                                        </span>
                                @endif
                                @if(!$value->trashed())
                                    <span class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                          title="حذف کمیسیون"
                                          onclick="del_row('{{url('admin/commissions/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف کمیسیون مطمئن هستید؟')">
                                             <i class="fa fa-remove"></i>
                                              حذف کمیسیون
                                        </span>
                                @else
                                    <span class="btn btn-danger"
                                          onclick="del_row('{{url('admin/commissions/'.$value->id)}}','{{ csrf_token() }}','اطلاعات شما از بین خواهد رفت.آیا مطمئن هستید؟')"
                                          data-toggle="tooltip" data-placement="top"
                                          title="حذف کامل کد تخفیف">
                                             <i class="fa fa-remove"></i>
                                              حذف کمیسیون
                                        </span>
                                @endif

                            </td>
                        </tr>

                    @endforeach

                    @if(sizeof($commission)==0)
                        <tr>
                            <td colspan="6">رکوردی برای نمایش وجود ندارد</td>
                        </tr>
                    @endif

                    </tbody>
                </table>
            </form>


            {{$commission->links()}}


        </div>
    </div>

@endsection


