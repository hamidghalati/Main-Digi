@extends('layouts.admin.admin')

@section('header')
    <link rel="stylesheet" href="{{asset('css/dropzone.min.css')}}">
@endsection

@section('content')



    @include('include.breadcrumb',['data'=>[
    ['title'=>'مدیریت  محصولات','url'=>url('admin/products')],
    ['title'=>'گالری  محصولات','url'=>url('admin/products/gallery/'.$product->id)],
    ]])

    <div class="panel">
        <div class="header">
             مدیریت  گالری :
            <p style="display: contents!important;" class="text-danger text-right">{{$product->title}}</p>
        </div>
        <div class="panel_content">

    @include('include.alert')


            <form  method="post" class="dropzone" id="upload_file" action="{{url('admin/products/gallery_upload/'.$product->id)}}">
                {{ csrf_field() }}

                <input style="display: none" name="file" type="file" multiple>
            </form>



            <table class="table table-striped" id="tbl_gallery">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ردیف</th>
                    <th scope="col">تصویر</th>
                    <th scope="col">عملیات</th>
                </tr>
                </thead>
                <tbody>
                <?php

                $i=(isset($_GET['page']))?(($_GET['page']-1)*10):0;
                ?>
                @foreach($product_gallery as $key=>$value)
                    <tr id="{{$value->id}}">
                        <td>

                            <div class="pretty p-icon p-smooth">
                                <input type="checkbox" name="product_gallery_id[]" value="{{$value->id}}" class="check_box" />
                                <div class="state p-danger-o">
                                    <i class="icon fa fa-close"></i>
                                    <label></label>
                                </div>
                            </div>

                        </td>
                        <td>{{replace_number(++$i)}}</td>

                        <td>
                            @if(!empty($value->image_url))
                                <img src="{{url('files/gallery/'.$value->image_url)}}" width="150" height="150" alt="">
                            @endif
                        </td>


                        <td>
                            <span class="btn btn-danger" onclick="del_row('{{url('admin/products/gallery/'.$value->id)}}','{{ csrf_token() }}','تصویر شما از بین خواهد رفت.آیا مطمئن هستید؟')" data-toggle="tooltip" data-placement="top"
                                title="حذف تصویر">
                               <i class="fa fa-remove" ></i>
                                حذف برند
                          </span>
                        </td>


                    </tr>





                @endforeach

                @if(sizeof($product_gallery)==0))
                    <tr>
                        <td colspan="4">رکوردی برای نمایش وجود ندارد</td>
                    </tr>
                @endif

                </tbody>
            </table>








        </div>
    </div>






@endsection

@section('footer')
    <script type="text/javascript" src="{{asset('js/dropzone.min.js')}}"></script>
    <script>
        Dropzone.options.uploadFile={
            acceptedFiles:'.png,.jpg,.jpeg',
            addRemoveLinks:true,
            init:function () {
                this.options.dictRemoveFile='حذف';
                this.options.dictInvalidFileType='امکان آپلود این فایل امکان پذیر نیست';
                this.on('success',function (file, response)
                {

                   if (response==1)
                   {

                       file.previewElement.classList.add("dz-success");

                   }
                   else
                   {
                       file.previewElement.classList.add("dz-error");
                       $(file.previewElement).find('.dz-error-message').text('خطا در آپلود فایل');

                   }
                });

                this.on('error',function (file, response) {
                    file.previewElement.classList.add("dz-error");
                    $(file.previewElement).find(".dz-error-message").text("خطا در آپلود فایل");
                });
            }
        }
    </script>

<script>
    const $sortable=$("#tbl_gallery > tbody");
    $sortable.sortable({

      stop:function (event,ui) {

          $("#loading_box").show();
          const parameters=$sortable.sortable("toArray");
          $.ajaxSetup({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
          });

          $.ajax({
              url:'{{url('admin/products/change_images_status/'.$product->id)}}',
              type:'POST',
              data:'parameters='+parameters,
              success:function (data) {
                  $("#loading_box").hide();
              }
          });
      }
    })

</script>

@endsection
