<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Question;
use Illuminate\Http\Request;

class QuestionController extends CustomController
{
    protected $model='question';
    protected $title='پرسش';
    protected $route_params='questions';

    public function index(Request $request)
    {
        $questions=Question::getData($request->all());
        $trash_count=Question::onlyTrashed()->count();
        return view('admin.question.index',['questions'=>$questions,'trash_count'=>$trash_count,'req'=>$request]);
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
                DB::table('comment_scores')->where('comment_id',$comment->id)->update(['status'=>$status]);
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
