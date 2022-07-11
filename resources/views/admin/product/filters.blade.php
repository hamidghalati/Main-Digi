@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت  محصولات','url'=>url('admin/products')],
    ['title'=>'  ثبت فیلترهای محصول','url'=>url('admin/products/'. $product->id .'/filters')]
    ]])
    <div class="panel">
        <div class="header">
            افزودن فیلتر :
            <p style="display: contents!important;" class="text-danger text-right">{{$product->title}}</p>

        </div>
        <div class="panel_content" id="product_filter_box">
    @include('include.alert')

            @if(sizeof($product_filters)>0)
                <form method="post" action="{{url('admin/products/'. $product->id .'/filters')}}">
                @csrf
                    @foreach($product_filters as $key=>$value)
                        <div class="item_group" style="margin-bottom: 20px">
                            <span class="title main-title" > <i class="fa fa-caret-left icon_title" ></i>  {{$value->title}} </span>
                            @foreach($value->getChild as $key2=>$value2)
                              <div class="form-group" style="margin-top: 10px">

                                  <div class="pretty p-icon p-curve p-pulse p-tada">
                                      <input type="checkbox" @if(is_selected_value($value->getValue,$value2->id)) checked="checked" @endif name="filter[{{$value->id}}][]" value="{{$value2->id}}" >
                                      <div class="state p-warning-o">
                                          <i class="icon mdi mdi-check-all"></i>
                                          <label></label>
                                      </div>
                                  </div>
                                  {{$value2->title}}
                              </div>

                            @endforeach

                        </div>
                    @endforeach

                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
                    </div>
                </form>
            @endif


        </div>
    </div>


@endsection
