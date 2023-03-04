<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('time');
            $table->integer('product_id');
            $table->integer('user_id');
            $table->integer('questions_id')->default(0);
            $table->smallInteger('status')->default(0);
            $table->smallInteger('answer_count')->default(0);
            $table->string('send_email')->default(0);
            $table->text('questions');
            $table->integer('like')->default(0);
            $table->integer('dislike')->default(0);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
