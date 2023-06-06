@extends('layouts.shop.shop')

@section('content')

    <div class="content">

        <div class="page">
            <h2>{{ $page->title }}</h2>

            <div>
                {!! strip_tags($page->content,'<p><br>') !!}
            </div>

        </div>

    </div>


@endsection

