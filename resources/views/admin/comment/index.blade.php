@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت نظرات و پیشنهادات','url'=>url('admin/comments')]]])
    <div class="panel">
        <div class="header">
            نظرات کاربران

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/comments','title'=>'نظر','remove_new_record'=>true])

        </div>
        <div class="panel_content">

            @include('include.alert')

            @include('include.CommentList')


            {{$comments->links()}}


        </div>
    </div>




@endsection
