<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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
            $table->increments('id');
            $table->string('title');
            $table->string('slug');
            $table->text('body');

            $table->integer('category_id')->unsigned();
            $table->integer('user_id')->unsigned();


            $table->foreign('category_id')    //kostia:26.04.2019 delete TESTing
            ->references('id')
            ->on('categories')
            ->onDelete('cascade');


            $table->foreign('user_id')        //kostia:26.04.2019 delete TESTing
            ->references('id')
            ->on('users')
            ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
