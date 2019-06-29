<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Model\Category;
use App\Model\Question;
use App\Model\Reply;
use App\Model\Like;
use App\Model\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        /*
        foreach(['admin', 'editor', 'user'] as $role_name) {
            $role = App\Model\Role::firstOrNew(['name'=>$role_name,'guard_name'=>$role_name]);
            $role->save();
        }
        echo 'roles added';
*/
        factory(User::class, 33)->create();
/*         ->each(function($user){
            //return $user->roles()->save( $role );
            //die;
            $role = App\Model\Role::get()->random();//factory(Role::class)->make();
            $user->roles()->attach($role->id);
            echo "USER ATTACHED ROLE => $role
           ";
       });
*/
       echo 'Users faking finished
       ';
       //die;
       factory(Category::class, 30)->create();echo 'Categories faking finished
       ';
       factory(Question::class, 100)->create();echo 'Questions faking finished
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
