<?php

use Faker\Generator as Faker;

$factory->define(App\Model\Category::class, function (Faker $faker) {
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
