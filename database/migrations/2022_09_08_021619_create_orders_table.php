<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('date');
            $table->integer('user_id');
            $table->integer('address_id');
            $table->string('pay_status',100);
            $table->integer('total_price');
            $table->integer('price');
            $table->string('order_id');
            $table->string('pay_code1')->nullable();
            $table->string('pay_code2')->nullable();
            $table->string('order_read');
            $table->string('send_type',100);
            $table->string('discount_value')->nullable();
            $table->string('discount_code')->nullable();
            $table->string('gift_value')->nullable();
            $table->integer('gift_id')->nullable();
            $table->integer('created_at');
            $table->integer('updated_at');
            $table->integer('deleted_at')->nullable();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
