<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Model\Question;
use App\Model\Like;

class Reply extends Model
{
    protected static function boot() {
        parent::boot();
        static::creating(function($reply){
            if (isset($_SERVER['REQUEST_METHOD'])) // чтобы при запуске СИДИНГА вручную, не надо было ето комментить,!,
                $reply->user_id = auth()->id();//закоментить при заполнении сидером и раскоментить при завершении работы Ф**КЕРА .!.
        });
    }
    protected $guarded = [];

    public function question() { return $this->belongsTo(Question::class); }
    public function user() { return $this->belongsTo(User::class); }
    public function like() { return $this->hasMany(Like::class); }
}
