<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommentScore extends Model
{
    protected $table='comment_scores';
    protected $fillable=['comment_id','product_id','score1','score2','score3','score4','score5','score6'];

    public static function getScoreTypeLabel()
    {
        $type=[
            'خیلی بد',
            'بد',
            'معمولی',
            'خوب',
            'عالی',
        ];
        return $type;
    }
}
