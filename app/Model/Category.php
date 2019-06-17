<?php

namespace App\Model;
use Illuminate\Database\Eloquent\Model;
use App\User;

class Category extends Model
{
    protected static function boot() {
        parent::boot();
        static::creating(function($question) {
         //   dd($question); //запускается констуркция при выполнениии -> php artisan db:seed
            if (isset($_SERVER['REQUEST_METHOD'])) // чтобы при запуске СИДИНГА вручную, не надо было ето комментить,!,
                $question-> slug = str_slug($question->name);//title
        });
    }
    //protected $fillable = [ 'title', 'slug', 'body', 'category_id', 'category_slug', 'user_id','question_id' ];
    protected $guarded = [];
    protected $with = ['questions'];
    public function questions() { return $this->hasMany(Question::class); }
    public function getRouteKeyName() { return 'slug'; }//берем из столбца слог
    public function getPathAttribute() { return "/category/$this->slug"; }
    //public function category() { return $this->belongsTo(Category::class); }
    public function user() { return $this->belongsTo(User::class); }
}
