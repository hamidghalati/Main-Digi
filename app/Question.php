<?php

namespace App;

use App\Mail\SendAnswer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mail;

class Question extends Model
{
    use SoftDeletes;

    protected $fillable = ['time', 'product_id', 'user_id', 'questions_id', 'status', 'answer_count', 'send_email', 'questions', 'like', 'dislike'];
    public $timestamps = false;


    public function getUser()
    {
        return $this->hasOne(User::class, 'id', 'user_id')->select(['id', 'name'])->withDefault(['name' => '']);
    }

    public function getAnswer()
    {
        return $this->hasMany(Question::class, 'questions_id', 'id')->where('status', 1);
    }

    public function getUserInfo()
    {
        return $this->hasOne(AdditionalInfos::class, 'user_id', 'user_id')
            ->select(['id', 'user_id', 'email', 'first_name', 'last_name']);
    }

    public function getProduct()
    {
        return $this->hasOne(ProductsModel::class, 'id', 'product_id')->select(['id', 'product_url', 'title']);
    }

    public static function getData($request)
    {
        $string = '?';
        $questions = self::with(['getProduct', 'getUserInfo', 'getParent'])->orderBy('id', 'DESc');
        if (inTrashed($request)) {
            $questions = $questions->onlyTrashed();
            $string = create_paginate_url($string, 'trashed=true');
        }

        if (array_key_exists('user_id', $request) && !empty($request['user_id'])) {
            $questions = $questions->where('user_id', $request['user_id']);
            $string = create_paginate_url($string, 'string=' . $request['string']);
        }

        $questions = $questions->paginate(10);
        $questions->withPath($string);
        return $questions;
    }

    public function getParent()
    {
        return $this->hasOne(Question::class, 'id', 'questions_id');
    }

    public function getQuestionAttribute($value)
    {
        return strip_tags(nl2br($value), '<br>');
    }

    public static function change_status($request)
    {
        if ($request->ajax()) {
            $question_id = $request->get('question_id');
            $question = Question::find($question_id);
            if ($question) {
                $status = $question->status == 1 ? 0 : 1;
                $question->status = $status;


                if ($question->update()) {
                    if ($question->questions_id > 0) {
                        self::updateAnswerCount($question->questions_id, $status);
                    }

                    if ($question->questions_id > 0 && $status == 1) {
                        self::sendAnswerEmail($question);

                    }


                    return 'ok';
                } else {
                    return 'error';
                }
            } else {
                return 'error';
            }
        }
    }

    public static function sendAnswerEmail($answer)
    {
        $question = Question::with(['getUserInfo', 'getProduct'])->where(['id' => $answer->questions_id, 'send_email' => 'ok'])->first();
        if ($question && $question->getUserInfo) {
            if (!empty($question->getUserInfo->email)) {
                Mail::to($question->getUserInfo->email)->queue(new SendAnswer($question, $answer));
            }
        }
    }

    public static function AddAnswer($id, $request, $text)
    {
        $user_id = $request->user()->id;
        $question = Question::where(['id' => $id, 'questions_id' => 0])->firstOrFail();
        $question->answer_count = $question->answer_count + 1;
        $question->update();

        $answer = new Question($request->all());
        $answer->time = time();
        $answer->user_id = $user_id;
        $answer->status = 1;
        $answer->questions_id = $id;
        $answer->questions = $text;
        $answer->product_id = $question->product_id;
        $answer->save();

        self::sendAnswerEmail($answer);
        return redirect()->back()->with(['message' => 'ثبت پرسش با موفقیت انجام شد', 'header' => 'ثبت پرسش', 'alerts' => 'success']);;

    }

    private static function updateAnswerCount($questions_id, $status)
    {
        $question = Question::where(['id' => $questions_id, 'questions_id' => 0])->first();
        if ($question) {

            if ($status == 1) {
                $question->answer_count = $question->answer_count + 1;
            } else {
                $question->answer_count = $question->answer_count - 1;
            }
            $question->update();

        }

    }


}
