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
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('slug');
            $table->text('body');



            $table->integer('category_id')->unsigned(); // делаем внешний ключ;
            $table  ->foreign('category_id')            // в questions есть столбец category_id
                    ->references('id')->on('categories') // связь с categories по ID
                    ->onDelete('cascade');              // при удалении categorie - удалить каскадно и question


            $table->unsignedBigInteger('user_id')->unsigned();
            $table->foreign('user_id')        //kostia:26.04.2019 delete TESTing
            ->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**  * Reverse the migrations. * @return void */
    public function down() { Schema::dropIfExists('questions');  }
}
