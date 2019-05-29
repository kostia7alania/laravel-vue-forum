# PLAYGROUND:
```
php artisan tinker
App\User::all();
App\User::find(1)
factory(App\User::class, 1000)->create();
App\Model\Category::all()
\App\Model\Like::all()->map->created_at
App\Model\Like::first
App\Model\Like::all()->first


etc..

```

php artisan migrate:rollback
php artisan migrate:rollback --step=5 # отменить последние 5 миграций
php artisan migrate:fresh --seed
php artisan migrate:refresh --seed


# ВАЖНАЯ ИНФА О приоритетах в МИГРАЦИЯХ
""""""""""""""""""
В папке базы данных/миграции/ваше имя файла миграции имеет следующий формат: year_month_day_hhmmss_create_XXXX_table.php

Просто переименуйте созданный файл пользователя, чтобы дата создания таблицы приоритетов таблиц была установлена ​​позже, чем дата пользователя (даже спустя одну секунду)
""""""""""""""""""




Команды:
-> ⌨ Зайти в линукс:
cd  laradock
docker-compose exec workspace bash
/*************/
docker-compose ps
ЗАХОДИМ в консоль ЛИНУХИ:
👉🏻 cd laradock ; docker-compose exec workspace bash
docker-compose exec —user=laradock workspace bash #чтобы избежать овнер иссуе каких-то там;
и дальше можно пахать с линухой как хоч;
php artisan config:clear
php artisan config:cache
php artisan serve
/*************/

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
            $table->increments('id');
            $table->integer('reply_id');
            $table->integer('user_id');
            $table->timestamps();
        });


## -> ⌨  СОЗдАТЬ ЗАПИСИ В БАЗЕ::
ИЗ КОНСОЛИ ВИНДЫ (в линухе не пашет пока ПДО с mssql)
    php artisan migrate # накатить миграции в базу
    php artisan migrate:fresh # очистить БД и накатить


===============================
## database\factories\:
## CategoryFactory.php

        $factory->define(App\Model\Category::class, function (Faker $faker) {
            $word = $faker->word;
            return [
                'name' => $word,
                'slug' => str_slug($word)
            ];
        });

## LikeFactory.php

    return [
        'user_id' => function() {
            return App\User::all()->random();
        }
    ];

## QuestionFactory.php

        use Faker\Generator as Faker;
        use App\Model\Category;

        $factory->define(App\Model\Question::class, function (Faker $faker) {
            $title = $faker->sentence;
            return [
                'title' =>  $title,
                'slug' =>  str_slug($title),
                'body' => $faker->text,
                'category_id' => function(){
                    return Category::all()->random();
                },
                'user_id' => function() {
                    return App\User::all()->random();
                }
            ];
        });


## ReplyFactory.php

        use Faker\Generator as Faker;
        use App\User;
        use App\Model\Question;

        $factory->define(App\Model\Reply::class, function (Faker $faker) {
            return [
                'body' => $faker->text,
                'question_id' => function () {
                    return Question::all()->random();
                },
                'user_id' => function () {
                    return User::all()->random();
                }
            ];
        });


  #генерируем фейковые данные:
        php artisan db:seed




## API
## routes\api.php
        Route::get('/question', 'QuestionController@index');
## смотрим список роутов (апи и веб):
php artisan route:list

Теперь напишем так:

        Route::apiResource('/question', 'QuestionController@index');

и увидим много роутов по формуле;;


## app\Http\Controllers\QuestionController.php
удаляем функцию crate() и edit()


На этом у нас вываливается ошибка:
Залазим в линукс и ставим дрова на MSSQL по мануалу:
https://docs.microsoft.com/en-us/sql/connect/php/installation-tutorial-linux-mac?view=sql-server-2017

add-apt-repository ppa:ondrej/php -y
apt-get update
apt-get install php7.3 php7.3-dev php7.3-xml -y --allow-unauthenticated

!!!!!!!!!!!!!!!
pecl install sqlsrv pdo_sqlsrv
!!!!!!!!!

TEST:
sqlcmd -S your_hostname -U your_login -P your_pass -Q "SELECT @@VERSION"

ТУТ СОВЕТ ПОМОГ: https://github.com/laravel/framework/issues/19403
но ввел ето в виндовой среде:
"""
php artisan key:generate
php artisan config:clear
php artisan config:cache
потом : php artisan serve
"""
и прикинь, запахало прямо на винде!! ЭТо мб у меня раньше пахало изза нехватки оперативы? [+8gb ram +500gb HDD]
С виндовыми дровами на ms sql; Но так не интересно и давай на линухе , то бишь, на убунте настроим дрова;;;


=> ВОЗМОЖНОЕ РЕШЕНИЕ ТРАБЛЫ С РАСШИРЕНИЕМ SQLSRV PHP :
https://github.com/laradock/laradock/issues/721
Удалить контейнеры php и nginx, поднастроить их в laradock и переустановить без кеша:
docker-compose build --no-cache php-fpm
docker-compose build --no-cache nginx




=================
смотрим роуты: жмакаем F1, пишем ROUTE LIST.

делаем остальные разделы + авторизацию JWT;

ФРОНТЕНД:
удаляю старый фронт и ставлю по Совету из доклада ЭванА Вью => https://github.com/yyx990803/laravel-vue-cli-3



git clone https://github.com/kostia7alania/laravel-vue-forum.git && cd laravel-vue-forum

git clone https://github.com/Laradock/laradock.git && cd laradock && cp env-example .env
```

# ms SQL server MAC :
```
sudo docker pull mcr.microsoft.com/mssql/server:2017-latest

sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=kostia12345' \
   -p 1433:1433 --name sql1 \
   -d mcr.microsoft.com/mssql/server:2017-latest

sudo docker ps -a

docker exec -it

sudo docker exec -it sql1 "bash"
где: sql1-имя при создании (флаг --name)

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'kostia12345'
CREATE DATABASE TestDB
SELECT Name from sys.Databases
GO

USE TestDB
CREATE TABLE Inventory (id INT, name NVARCHAR(50), quantity INT)
INSERT INTO Inventory VALUES (1, 'banana', 150); INSERT INTO Inventory VALUES (2, 'orange', 154);
GO

SELECT * FROM Inventory WHERE quantity > 152;
GO

QUIT

```
# Подключение из-за пределов контейнера
Определите IP-адрес компьютера, на котором размещен контейнер. В Linux используйте команды ifconfig или IP-адрес. В Windows используйте команду ipconfig.
sqlcmd -S 10.3.2.4,1433 -U SA -P '<YourNewStrong!Passw0rd>'
у нас - localhost:1433 !!!
# mssql VCDode:
поСтавить расширение  mssql
F1 ввести sql - connect
# Удаление контейнера
sudo docker stop sql1
sudo docker rm sql1

# подробная инфа  о тачке:
docker inspect laradock_nginx_1

# ============== Посмотреть все команды:
```
 php artisan
```

# ставим образ из папки:
```
cd laradock
docker-compose up -d mssql nginx
```
workspace сам ставится, можно не упоминать)


# Удалить контейнеры php и nginx, поднастроить их в laradock и переустановить без кеша:
docker-compose build --no-cache php-fpm
docker-compose build --no-cache nginx

# -> НАКАТИТЬ СВЕЖАК БД:

# (сначала руками удалить таблицу questions)
#!!автомат-выполнит down() в миграциях->
```
php artisan migrate:rollback
```
# переСоздать БД
```
php artisan migrate:fresh
```
# генерируем фейковые данные (сначала закоментить статик бут функцию тут -> app\Model\Reply.php):
```php artisan db:seed```




# ОБРАБОТКА ОШИБОК:
```
UnexpectedValueException
There is no existing directory at "C:\test\php\laravel-vue-forum\storage\logs" and its not buildable: Invalid argument
```
НАДО ПОЧИСТИТЬ КЕШ из той среды, где пытаешься запустить ЛАРКУ:
1) если из под LARADOCK, то:
```
docker-compose exec —user=laradock workspace bash #в общем случае,если нет,то из расширения докера в VSCODE правой кнопкой по контейнеру WORKSPACE правой кнопкой нажать, затем -  "Attach Shell":
php artisan config:cache
```
2) Если хочешь запустить из под Ларки (пхп), т.е. так: php artisan serve, то без докера:
```
php artisan config:cache
######## БЫСТРО РАЗВОРАЧИВАЕМ ЛАРАВЕЛ НА КОЛЕНКАХ!!!!!
# 0) форкаем репу;
# 1) меняем в ./.env:
```
DB_CONNECTION=sqlite
#DB_DATABASE=kostia7forum # да, закомментировать!
```
# 2) создать файл: ./database/kostia7alania.sqlite
# 3) чистим, мигрируем и запускаемся:
```
php artisan config:clear
php artisan config:cache
php artisan migrate
php artisan serve
```
