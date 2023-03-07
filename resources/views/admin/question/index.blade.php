@extends('layouts.admin.admin')
@section('content')

    @include('include.breadcrumb',['data'=>[['title'=>'مدیریت پرسش ها','url'=>url('admin/questions')]]])
    <div class="panel">
        <div class="header">
            پرسش و پاسخ های کاربران

            @include('include.item_table',['count'=>$trash_count,'route'=>'admin/questions','title'=>'پرسش','remove_new_record'=>true])

        </div>
        <div class="panel_content">

            @include('include.alert')

            @include('include.QuestionList')


            {{$questions->links()}}


        </div>
    </div>




@endsection

