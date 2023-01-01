<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('email')->unique();
            $table->string('mobile')->unique();
            $table->string('password');
            $table->smallInteger('step');
            $table->string('account_status',100)->default('awaiting_approval');
            $table->string('active_code')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('fname')->nullable();
            $table->string('lname')->nullable();
            $table->integer('province_id')->default(0);
            $table->integer('city_id')->default(0);
            $table->smallInteger('account_type')->nullable();
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
        Schema::dropIfExists('sellers');
    }
}
