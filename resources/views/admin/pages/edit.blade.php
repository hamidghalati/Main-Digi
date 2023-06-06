@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت صفحه ','url'=>url('admin/pages')],
       ['title'=>'افزودن صفحه جدید','url'=>url('admin/pages/create')]
       ]])


    <div class="panel">
        <div class="header">افزودن صفحه جدید</div>
        <div class="panel_content">

            {{ Form::model($page,['url' => 'admin/pages/'.$page->id]) }}
            {{method_field('PUT')}}

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        {{ Form::label('title', 'عنوان صفحه :')}}
                        {{ Form::text('title', null,['class'=>'form-control total_width_input'])}}

                        @if($errors->has('title'))
                            <span class="has_error">{{$errors->first('title')}}</span>
                        @endif
                    </div>
                </div>

            </div>
            <div class="form-group">
                {{ Form::label('content', 'محتوای صفحه :')}}
                {{ Form::textArea('content', null,['class'=>'form-control total_width_input ckeditor'])}}
                @if($errors->has('content'))
                    <span class="has_error">{{$errors->first('content')}}</span>
                @endif
            </div>


                <div class="col-md-6" style="margin-bottom: 30px!important;">
                    <div class="form-group">

                        <input type="text" name="tag_list" id="tag_list" class="form-control"
                               placeholder="برچسب های محصول">
                        <div class="btn btn-success" id="add_tag" onclick="add_tag()">افزودن</div>

                        <input type="hidden" name="keywords" value="{{$page->keywords}}" id="keywords">
                    </div>
                    <div id="tag_box">
                        <?php
                        $keywords = $page->keywords;
                        $e = explode(',', $keywords);
                        $i = 1;
                        ?>
                        @if (is_array($e))
                            @foreach ($e as $key=>$value)
                                @if (!empty($value))
                                    <div class="tag_div" id="tag_div_{{$i}}">
                                        <span class="fa fa-remove" onclick="remove_tag('{{$i}}','{{$value}}')"></span>
                                        {{$value}}
                                    </div>
                                        <?php
                                        $i++;
                                        ?>
                                @endif
                            @endforeach
                        @endif

                    </div>

                    <div style="clear: both"></div>

                </div>

                <div class="form-group">
                    {{ Form::label('description', 'توضیحات مختصر (حداکثر 150 کاراکتر) :',['style'=>'width:100%!important'])}}
                    {{ Form::textArea('description', null,['class'=>'form-control description'])}}

                    @if($errors->has('description'))
                        <span class="has_error">{{$errors->first('description')}}</span>
                    @endif
                </div>


            <div class="col-md-12">
                <div class="form-group">
                    <div class="d-grid gap-2 col-6 mx-auto" style="text-align: center!important;">
                        <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-pencil"></i> ثبت اطلاعات
                        </button>
                    </div>
                </div>
            </div>

        </div>

        @endsection

        @section('footer')
            <script src="{{ asset('ckeditor/ckeditor.js') }}" defer></script>
@endsection

