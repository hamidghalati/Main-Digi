<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiscountCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discount_codes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code');
            $table->integer('expire_time');
            $table->integer('cat_id')->default(0);
            $table->integer('amount');
            $table->smallInteger('number_usable')->default(1);
            $table->smallInteger('incredible_offers')->default(0);
            $table->string('amount_discount',100)->nullable();
            $table->string('amount_percent',100)->nullable();
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
        Schema::dropIfExists('discount_codes');
    }
}
