<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRepliesTable extends Migration
{
    /** * Run the migrations. * * @return void */
    public function up() {
        Schema::create('replies', function (Blueprint $table) {
            $table->increments('id');
            $table->text('body');


            $table->unsignedBigInteger('user_id')->unsigned();
            $table  ->foreign('user_id')
                    ->references('id')->on('users');
                   // ->onDelete('cascade');//УдалИТСЯ,когда сработает триггер в QUESTIONs!!! а если просто ЮЗЕР будет удален 7



            $table->unsignedBigInteger('question_id')->unsigned(); // делаем внешний ключ;
            $table  ->foreign('question_id')           // в replies есть столбец QUESTION_ID
                    ->references('id')->on('questions') // связь с QUESTIONS по ID
                    ->onDelete('cascade');              // при удалении question'a - удалить каскадно и reply

            $table->timestamps();
        });
    }
    /** * Reverse the migrations. * * @return void */
    public function down() { Schema::dropIfExists('replies'); }
}
