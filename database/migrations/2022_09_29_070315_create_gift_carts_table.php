<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGiftCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gift_carts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('code');
            $table->integer('user_id');
            $table->integer('order_id');
            $table->integer('credit_cart');
            $table->integer('credit_used');
            $table->integer('validity_date')->nullable();
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
        Schema::dropIfExists('gift_carts');
    }
}
