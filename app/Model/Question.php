<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Question extends Model
{
    protected static function boot() {
        parent::boot();
        static::creating(function($question) {
            $question-> slug = str_slug($question->title);//при создании (триггер или хук CREATING) вопроса, генерится УРЛ в транслите от тайтла
        });
    }

    public function getRouteKeyName() {
        return 'slug';//берем из столбца слог
     }

    protected $fillable = ['title','slug','body','category_id','category_slug','user_id'];
   //protected $guarded = [];
    protected $with = ['replies'];
    public function user() { return $this->belongsTo(User::class); }
    public function replies() {return $this->hasMany(Reply::class)->latest(); }
    public function category() { return $this->belongsTo('Category::class'); }
    public function getPathAttribute() {return "/question/$this->slug";
        //return asset("api/question/$this->slug");

    }

}
