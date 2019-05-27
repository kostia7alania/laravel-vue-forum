<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('reply_id');
            $table->integer('user_id');
            $table->timestamps();
            // $table->unique(['user_id', 'reply_id']);//  29.5.19 => тормозим повторный лайк! !! НАДО ПРОТЕСТИТЬ !
        });
    }

    /** * Reverse the migrations.  * @return void */
    public function down()   {   Schema::dropIfExists('likes');  }
}
