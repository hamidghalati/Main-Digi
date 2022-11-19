<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment_scores', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('comment_id');
            $table->smallInteger('score1')->nullable();
            $table->smallInteger('score2')->nullable();
            $table->smallInteger('score3')->nullable();
            $table->smallInteger('score4')->nullable();
            $table->smallInteger('score5')->nullable();
            $table->smallInteger('score6')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comment_scores');
    }
}
