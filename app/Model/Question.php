<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Reply;
use App\Category;
use Illuminate\Http\Request;

class Question extends Model
{
    //при создании (триггер или хук CREATING) вопроса, генерится УРЛ в транслите от тайтла
    protected static function boot() {
         parent::boot();
        static::creating(function($question, Request $request) {
            $method = $request->method();   // НАДО придумать че-нить,--> 31.5.19:  УЖЕ ПРИДУМАЛ:
            if ($request->isMethod('post')) // чтобы при запуске СИДИНГА вручную, не надо было ето комментить,!,
                $question-> slug = str_slug($question->title);
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
    public function category() { return $this->belongsTo(Category::class); }
    public function getPathAttribute() {return "/question/$this->slug";

        //return asset("api/question/$this->slug");

    }

}
