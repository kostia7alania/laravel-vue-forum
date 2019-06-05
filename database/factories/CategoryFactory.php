<?php

use Faker\Generator as Faker;
use App\Model\Category;

$factory->define(Category::class, function (Faker $faker) {
    $word = $faker->word;
    $rand = $faker->unique()->country;//firstNameFemale;
    echo $rand.'
    ';
    return [
        'name' => $rand,
        //'slug' => str_slug($word), word-англ слово
        'slug' => str_slug($rand)
    ];
});
