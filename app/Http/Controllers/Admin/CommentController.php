<?php

namespace App\Http\Controllers\Admin;

use App\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentController extends CustomController
{
    protected $model='Comment';
    protected $title='نظرات';
    protected $route_params='comments';

    public function index(Request $request)
    {
        $comments=Comment::getData($request->all());
        $trash_count=Comment::onlyTrashed()->count();
        return view('admin.comment.index',['comments'=>$comments,'trash_count'=>$trash_count,'req'=>$request]);
    }

    public function change_status(Request $request)
    {
        if ($request->ajax())
        {
            $comment_id=$request->get('comment_id');
            $comment=Comment::find($comment_id);
            if ($comment)
            {
                $status=$comment->status==1 ? 0 : 1;
                $comment->status=$status;
                if ($comment->update())
                {
                    return 'ok';
                }
                else
                {
                    return 'error';
                }
            }
            else
            {
                return 'error';
            }
        }

    }


}
