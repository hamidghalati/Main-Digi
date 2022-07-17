@extends('layouts.shop.shop')
@section('content')
    <div class="row slider">
        <div class="col-2"></div>
        <div class="col-10">
            @if(sizeof($sliders)>0)
                <div class="slider_box">
                    <div style="position: relative" >
                        @foreach($sliders as $key=>$value)
                            <div class="slide_div an" id="slider_img_{{$key}}" @if($key==0)style="display: block" @endif>
                                <a href="{{$value->url}}" style="background-image: url('<?= url('files/slider/'.$value->image_url)?>')"></a>
                            </div>
                        @endforeach
                    </div>

                    <div id="right-slide" onclick="prev()"></div>
                    <div id="left-slide" onclick="next()"></div>

                </div>
               <div class="slider_box_footer">
                   <div class="slider_bullet_div">
                       @for($i=0;$i<sizeof($sliders);$i++)
                           <span id="slider_bullet_{{$i}}" @if($i==0) class="active"@endif></span>

                       @endfor
                   </div>
               </div>
            @endif
        </div>
    </div>
@endsection
@section('footer')
    <script>
        load_slider('<?= sizeof($sliders)?>');
    </script>
@endsection


