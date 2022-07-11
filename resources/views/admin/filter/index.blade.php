@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت گروه محصولات','url'=>url('admin/category')],
    ['title'=>'مدیریت فیلتر ها','url'=>url('admin/category/'.$category->id.'/filters')],
]])
    <div class="panel">
        <div class="header">
            مدیریت فیلتر گروه :
            <p style="display: contents!important;" class="text-danger text-right">{{$category->name}}</p>


        </div>
        <div class="panel_content">

    @include('include.alert')


            <form method="post" action="{{url('admin/category/'.$category->id.'/filters')}}">
                @csrf

                <div class="category_filters">
                    @if(sizeof($filters)>0)
                        @foreach($filters as $key=>$value)
                            <div class="form-group item_group" id="filter_{{$value->id}}">

                                <select name="item_id[{{$value->id}}]" class="selectpicker" data-live-search="true">
                                    <option value="0">انتخاب ویژگی(در صورت نیاز)</option>
                                    @foreach($items as $itemKey=>$itemValue)
                                        @foreach($itemValue->getChild as $k=>$v)
                                            <option @if($v->id==$value->item_id) selected="selected" @endif value="{{$v->id}}">{{$v->title}}</option>
                                        @endforeach
                                    @endforeach
                                </select>
                                <input type="text" style="margin-right: 90px" class="form-control filter_input" value="{{$value->title}}" name="filter[{{$value->id}}]" placeholder="نام گروه فیلتر">
                                <span class="fa fa-plus-circle" onclick="add_filter_child_input({{$value->id}})"></span>
                                <span class="btn btn-danger  item_remove_message" onclick="del_row('{{url('admin/category/filters/'.$value->id)}}','{{ csrf_token() }}','آیا از حذف این فیلتر مطمئن هستید؟')"><i class="fa fa-trash-can-arrow-up" ></i>   حذف  گروه {{ $value->title }} </span>
                                <div class="child_filter_box">
                                    <?php $i=1?>
                                    @foreach($value->getChild as $childFilter)
                                        <div class="form-group child_{{$value->id}}" >
                                            {{$i}}-  <input type="text" name="child_filter[{{$value->id}}][{{$childFilter->id}}]" value="{{$childFilter->title}}" class="form-control child_input_filter" placeholder="نام فیلتر">
                                            <span class="child_item_remove_message " onclick="del_row('{{url('admin/category/filters/'.$childFilter->id)}}','{{ csrf_token() }}','آیا از حذف این فیلتر مطمئن هستید؟')">حذف فیلتر </span>

                                        </div>
                                        <?php $i++ ?>
                                    @endforeach
                                </div>
                            </div>

                        @endforeach
                    @else
                        <div class="form-group item_group" id="filter_-1">
                            <input type="text" class="form-control filter_input"  name="filter[-1]" placeholder="نام گروه فیلتر">
                            <span class="fa fa-plus-circle" onclick="add_filter_child_input(-1)"></span>

                            <div class="child_filter_box">
                            </div>
                        </div>

                    @endif


                </div>



                <div id="filter_box"></div>
                <span class="fa fa-2x fa-plus-square" onclick="add_filter_input()"></span>





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
           $('.category_filters').sortable();
           $('.child_filter_box').sortable();
        });
    </script>


@endsection
