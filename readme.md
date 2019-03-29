Команды:

-> ⌨ Зайти в линукс:
cd  laradock
docker-compose exec workspace bash



1) Создаем модель:
php artisan help make:model #выведет хелп
php artisan make:model Model/Question -mfr # ( где m-migration, c-controller, r-ресурс-контроллер (CRUD)))

СОЗДАСТ файл в моделях! + запись в базе! НЕ СОЗДАСТ )))
2) Создаем апи:
можно было бы так php artisan make:controller ReplyController —api
но, в итоге, сделал итак:
php artisan make:model Model/Reply -mfr
php artisan make:model Model/Category -mfr
php artisan make:model Model/Like -mfr


## -> меняем конструкторы:
## database\migrations\2019_03_29_085411_create_questions_table.php

        Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('slug');
            $table->text('body');

            $table->integer('category_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->timestamps();
        });


## database\migrations\2019_03_29_085454_create_replies_table.php
        Schema::create('replies', function (Blueprint $table) {
            $table->increments('id');
            $table->text('body');

            $table->integer('question_id')->unsigned();

            $table->integer('user_id')->unsigned();

            $table  ->foreign('question_id')
                    ->references('id')
                    ->on('questions')
                    ->onDelete('cascade');

            $table->timestamps();
        });

## database\migrations\2019_03_29_085910_create_categories_table.php
        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

## database\migrations\2019_03_29_090005_create_likes_table.php
        Schema::create('likes', function (Blueprint $table) {
            $table->integer('id');
            $table->integer('reply_id');
            $table->integer('user_id');
            $table->timestamps();
        });


## -> ⌨  СОЗдАТЬ ЗАПИСИ В БАЗЕ::
ИЗ КОНСОЛИ ВИНДЫ (в линухе не пашет пока ПДО с mssql)
        php artisan migrate