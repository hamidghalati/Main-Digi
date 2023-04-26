<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCommissionColumnToSellerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sellers', function (Blueprint $table) {
            $table->integer('total_commission')->default(0)->nullable();
            $table->integer('paid_commission')->default(0)->nullable();
            $table->integer('total_price')->default(0)->nullable();
            $table->integer('new_order_count')->default(0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sellers', function (Blueprint $table) {
            $table->dropColumn('total_commission');
            $table->dropColumn('paid_commission');
            $table->dropColumn('total_price');
            $table->dropColumn('new_order_count');
        });
    }
}
