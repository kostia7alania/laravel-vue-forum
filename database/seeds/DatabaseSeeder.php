<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Model\Category;
use App\Model\Question;
use App\Model\Reply;
use App\Model\Like;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        factory(User::class, 33)->create(); echo 'Users faking finished
       ';
       //die;
       factory(Category::class, 33)->create();echo 'Categories faking finished
       ';
       factory(Question::class, 33)->create();echo 'Questions faking finished
       ';

       factory(Reply::class, 113)
        ->create()
        ->each(function($reply){
            $user = factory(Like::class)->make();
            return $reply->like()->save( $user );   echo "USER LIKED => $reply
           ";
       });
    }
}
