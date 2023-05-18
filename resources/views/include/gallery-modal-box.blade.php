@if(sizeof($product->Gallery)>0)
    <!-- Modal -->
    <div class="modal fade" id="product_gallery_box" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle" style="color: #ef4056">تصاویر رسمی</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body gallery_box_content">
                    <div class="right_box">

                        <div class="img_swiper" id="img_swiper">

                            @foreach($product->Gallery as $key=>$value)
                                <div class="swiper-slide @if($key==0) img_select_border @endif">
                                    <img src="{{ url('files/gallery/'.$value->image_url) }}">
                                </div>
                            @endforeach

                        </div>

                    </div>
                    <div class="left_box">

                       <div class="gallery_item" id="gallery_item">
                           @foreach($product->Gallery as $key=>$value)
                               @if($key==0)
                                   <img ondragstart="return false" onload="set_image_width()" src="{{ url('files/gallery/'.$value->image_url) }}" alt="" width="65%"
                                        id="selected_img">
                               @endif
                           @endforeach
                       </div>

                        <div class="range_slider">
                            <span class="mdi mdi-minus range_slider_minus" id="range_minus"></span>
                            <input type="range" value="0" min="0" max="100" id="image_zoom_range">
                            <span class="mdi mdi-plus range_slider_plus" id="range_plus"></span>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endif
