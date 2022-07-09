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
                    @foreach($filters as $key=>$value)
                        <div class="form-group item_group" id="filter_{{$value->id}}">
                            <input type="text" class="form-control filter_input" value="{{$value->title}}" name="filter[{{$value->id}}]" placeholder="نام گروه فیلتر">
                            <span class="fa fa-plus-circle" onclick="add_filter_child_input({{$value->id}})"></span>
                            <div class="child_filter_box"></div>
                        </div>

                    @endforeach

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
           $('.category_items').sortable();
           $('.child_item_box').sortable();
        });
    </script>

@endsection
