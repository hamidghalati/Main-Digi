<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id');
            $table->integer('product_id');
            $table->string('title');
            $table->text('content');
            $table->integer('time');
            $table->integer('order_id')->nullable();
            $table->integer('like')->default(0);
            $table->integer('dislike')->default(0);
            $table->text('advantage')->nullable();
            $table->text('disadvantage')->nullable();
            $table->smallInteger('status');
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
        Schema::dropIfExists('comments');
    }
}
