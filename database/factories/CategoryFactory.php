<?php

use Faker\Generator as Faker;
use App\Model\Category;

$factory->define(Category::class, function (Faker $faker) {
    $word = $faker->word;
    $rand = $faker->unique()->firstNameFemale;
    echo $rand.'
    ';
    return [
        'name' => $word,
        //'slug' => str_slug($word),
        'slug' => $rand
    ];
});
