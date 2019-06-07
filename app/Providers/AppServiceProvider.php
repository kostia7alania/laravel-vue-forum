<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**  * Bootstrap any application services.  * @return void */
    public function boot()
    {
        //
        if(0)//выводить sql-запрос?
        DB::listen(function ($query) {
            //print_r($query->bindings);
            //dump($query->sql);//сам запрос
            //dump($query->bindings);//переданные в него параметры
        });

    }
}
