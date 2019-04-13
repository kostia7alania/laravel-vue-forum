<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected static function boot() {
        parent::boot();
        static::creating(function($question) {
         //   dd($question); //запускается констуркция при выполнениии -> php artisan db:seed
          //  $question-> slug = str_slug($question->title);
        });
    }
    //protected $fillable = [ 'title', 'slug', 'body', 'category_id', 'category_slug', 'user_id','question_id' ];
    protected $guarded = [];
    protected $with = ['questions'];
    public function questions() { return $this->hasMany(Question::class)->latest(); }
    public function getRouteKeyName() { return 'slug'; }//берем из столбца слог
    public function getPathAttribute() { return "/category/$this->slug"; }
    //public function category() { return $this->belongsTo(Category::class); }
    public function user() { return $this->belongsTo(User::class); }

}
