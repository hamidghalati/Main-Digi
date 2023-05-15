@if(sizeof($product->Gallery)>0)
    <ul class="gallery_ul">
        @foreach($product->Gallery as $key=>$value)
            @if($key<3)
                <li>
                    <img src="{{ url('files/gallery/'.$value->image_url) }}" alt="" data-toggle="modal"
                         data-target="#product_gallery_box">
                </li>
            @endif
        @endforeach

        @if(sizeof($product->Gallery)>2)
            <li class="button" data-toggle="modal"
                data-target="#product_gallery_box">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </li>
        @endif

    </ul>




@endif
