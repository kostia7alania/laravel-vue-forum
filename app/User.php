<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Model\Question;
use App\Model\Reply;

use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
/** The attributes that are mass assignable. * @var array     */
    protected $fillable = [ 'name', 'email', 'password', ];
    /** The attributes that should be hidden for arrays. * @var array */
    protected $hidden = [ 'password', 'remember_token', ];
    /** * The attributes that should be cast to native types.* @var array */
    protected $casts = [ 'email_verified_at' => 'datetime', ];

    // Rest omitted for brevity
    /** Get the identifier that will be stored in the subject claim of the JWT.* @return mixed */
    public function getJWTIdentifier()  {
        //return the primary key of the user - user id
        return $this->getKey();
    }

    /** * Return a key value array, containing any custom claims to be added to the JWT.
     * @return array */
    public function getJWTCustomClaims() {//reutrn a key value array, containing any claims to be added to  JWT
        return [];
    }

    public function setPasswordAttribute($value) { $this->attributes['password'] = bcrypt($value); }

    public function question() { return $this->hasMany(Question::class); }
    public function reply() { return $this->hasMany(Reply::class); }
//  public function roles() { return $this->belongsToMany('App\Model\Role', 'user_roles'); }
}
