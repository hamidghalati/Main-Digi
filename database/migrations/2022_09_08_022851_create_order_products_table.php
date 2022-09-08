<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('order_id');
            $table->integer('product_id');
            $table->integer('color_id');
            $table->integer('warranty_id');
            $table->integer('product_price1');
            $table->integer('product_price2');
            $table->integer('product_count');
            $table->integer('seller_id')->default(0);
            $table->integer('preparation_time')->default(0);
            $table->integer('send_status')->default(0);
            $table->integer('time')->default(0);
            $table->string('seller_read',100)->default('no');
            $table->integer('commission')->default(0);
            $table->text('tozihat')->nullable();
            $table->integer('stockroom_id')->default(0);





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
        Schema::dropIfExists('order_products');
    }
}
