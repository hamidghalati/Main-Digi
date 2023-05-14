@if(sizeof($product->Gallery)>0)
    <ul class="gallery_ul">
        @foreach($product->Gallery as $key=>$value)
            @if($key<3)
                <li>
                    <img src="{{ url('files/gallery/'.$value->image_url) }}" alt=""  data-toggle="modal" data-target="#product_gallery_box">
                </li>
            @endif
        @endforeach

        @if(sizeof($product->Gallery)>2)
            <li class="button">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </li>
        @endif

    </ul>


    <!-- Modal -->
    <div class="modal fade" id="product_gallery_box" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>






@endif
