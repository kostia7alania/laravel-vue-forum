<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**  * Run the migrations.  * @return void */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('role')->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');/*
            $table->string('type')->default('user');
            $table->mediumText('bio')->nullable();
            $table->string('photo')->default('profile.png');*/
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**  * Reverse the migrations. * @return void  */
    public function down() {
        Schema::dropIfExists('likes');
        Schema::dropIfExists('replies');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('users');
        Schema::dropIfExists('questions');
    }
}
