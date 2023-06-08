@extends('layouts.mobile.mobile')

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

@section('seo')
    <meta name="description" content="{{ $page->description }}">
    <meta name="keywords" content="{{ $page->keywords}}">
    <meta property="og:site_name" content="{{ config('shop-info.shop_name') }}" />
    <meta property="og:description" content="{{ $page->description }}" />
    <meta property="og:title" content="{{ $page->title }}" />
    <meta property="og:locale" content="fa_IR" />
    <meta name="twitter:description" content="{{ $page->description}}">
    <meta name="twitter:title" content="{{ $page->title}}">
@endsection
