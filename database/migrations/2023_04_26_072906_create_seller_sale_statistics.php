<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellerSaleStatistics extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seller_sale_statistics', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('year');
            $table->string('month');
            $table->string('day');
            $table->integer('price');
            $table->integer('commission')->default(0)->nullable();
            $table->integer('seller_id');
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
        Schema::dropIfExists('seller_sale_statistics');
    }
}
