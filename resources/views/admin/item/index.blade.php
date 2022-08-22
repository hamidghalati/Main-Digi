@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
        ['title'=>'مدیریت  محصولات','url'=>url('admin/products')],
    ['title'=>'مدیریت ویژگی ها','url'=>url('admin/category/'.$category->id.'/items')]]])
    <div class="panel">
        <div class="header">
            مدیریت ویژگی های دسته :
            <p style="display: contents!important;" class="text-danger text-right">{{$category->name}}</p>


        </div>
        <div class="panel_content">

    @include('include.alert')


            <form method="post" action="{{url('admin/category/'.$category->id.'/items')}}">
                @csrf

                <div class="category_items">
                    @if(sizeof($items)>0)
                        @foreach($items as $key=>$value)
                            <div class="form-group item_group" id="item_{{$value->id}}">
                                <input type="text" value="{{$value->title}}" class="form-control item_input" name="item[{{$value->id}}]" placeholder="نام گروه ویژگی">
                                <span class="fa fa-plus-circle" onclick="add_child_input({{$value->id}})"></span>

                                <span class="btn btn-danger  item_remove_message" onclick="del_row('{{url('admin/category/items/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این گروه مطمئن هستید؟')"><i class="fa fa-trash-can-arrow-up" ></i>   حذف  گروه {{ $value->title }} </span>

                                <div class="child_item_box">
                                    <?php $i=1?>
                                    @foreach($value->getChild as $childItem)
                                        <div class="form-group child_{{$value->id}}" >
                                            <span style="font-family: IRANSans!important;">{{$i}}</span> -  <div class="pretty p-icon p-curve p-pulse">
                                                <input type="checkbox" @if($childItem->show_item==1) checked @endif name="check_box_item[{{$value->id}}][{{$childItem->id}}]" >
                                                <div class="state p-warning-o">
                                                    <i class="icon mdi mdi-check"></i>
                                                    <label></label>
                                                </div>
                                            </div>
                                            <input type="text" name="child_item[{{$value->id}}][{{$childItem->id}}]" value="{{$childItem->title}}" class="form-control child_input_item" placeholder="نام ویژگی">

                                            <span class="child_item_remove_message " onclick="del_row('{{url('admin/category/items/'.$childItem->id)}}','{{ csrf_token() }}','آیا از حذف این آیتم مطمئن هستید؟')">حذف  </span>


                                            <span style="font-family: IRANSans!important;"><?php $i++?></span>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endforeach
                    @else
                        <div class="form-group item_group" id="item_-1">
                            <input type="text" class="form-control item_input" name="item[-1]" placeholder="نام گروه ویژگی">
                            <span class="fa fa-plus-circle" onclick="add_child_input(-1)"></span>
                            <div class="child_item_box">
                            </div>
                        </div>

                    @endif
                </div>



                <div id="item_box"></div>
                <span class="fa fa-2x fa-plus-square" onclick="add_item_input()"></span>





                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
                </div>
            </form>


        </div>
    </div>




@endsection

@section('footer')

    <script>
        $(document).ready(function () {
           $('.category_items').sortable();
           $('.child_item_box').sortable();
        });
    </script>

@endsection
