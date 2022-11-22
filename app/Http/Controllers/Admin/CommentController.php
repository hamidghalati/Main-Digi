<?php

namespace App\Http\Controllers\Admin;

use App\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentController extends CustomController
{
    protected $model='Comments';
    protected $title='نظرات';
    protected $route_params='comment';

    public function index(Request $request)
    {
        $comments=Comment::getData($request->all());
        $trash_count=Comment::onlyTrashed()->count();
        return view('admin.comment.index',['comments'=>$comments,'trash_count'=>$trash_count,'req'=>$request]);
    }


}
