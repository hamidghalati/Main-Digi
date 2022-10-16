@extends('layouts.shop.shop')
@section('content')

    <div class="container-fluid">
        <ul class="list-inline map_ul">
            <li><a href="{{url('/')}}">فروشگاه</a></li>/
            <li>{{$category->name}}</li>
        </ul>
        <div class="row">


            <div class="content card-columns">
                @foreach($category->getChild as $key=>$value)
                    @if(sizeof($value->getChild)>0)
                        <div class="card child_cat_div">
                            @if(!empty($value->img))
                                <img src="{{url('files/upload/'.$value->img)}}" alt="">
                            @endif
                            <p class="cat_name">{{$value->name}}</p>

                            <ul>
                                @foreach($value->getChild as $key2=>$value2)
                                    <li>
                                        <a href="{{url('search/'.$value2->url)}}">
                                            {{$value2->name}}
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                @endforeach
            </div>

        </div>
    </div>



@endsection
