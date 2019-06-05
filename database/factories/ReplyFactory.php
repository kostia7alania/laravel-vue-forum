<?php

use Faker\Generator as Faker;
use App\User;
use App\Model\Question;

$factory->define(App\Model\Reply::class, function (Faker $faker) {
    return [
        'body' => $faker->realText($faker->numberBetween(10,2000)),//$faker->text,
        'question_id' => function () {
            return Question::all()->random();
        },
        'user_id' => function () {
            return User::all()->random();
        }
    ];
});
