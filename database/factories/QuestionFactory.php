<?php

use Faker\Generator as Faker;
use App\Model\Category;

$factory->define(App\Model\Question::class, function (Faker $faker) {
    $title = $faker->realText($faker->numberBetween(10,111)); // $faker->sentence;
    return [
        'title' =>  $title,
        'slug' =>  str_slug($title),
        'body' => $faker->realText($faker->numberBetween(10,2000)),//$faker->text,
        'category_id' => function(){
            return Category::all()->random();
        },
        'user_id' => function() {
            return App\User::all()->random();
        }
    ];
});
