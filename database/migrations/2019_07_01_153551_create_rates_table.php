<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatesTable extends Migration {
    /** * Run the migrations. * * @return void */
    public function up() {
        Schema::create('rates', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('question_id');
            $table->integer('user_id');

            $table->timestamps();
        });
    }

    /**  * Reverse the migrations. * * @return void */
    public function down() { Schema::dropIfExists('rates'); }
}
