<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'login', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    public function setRememberToken($value)
    {
        // nothing here...
    }

    public function getRememberToken()
    {
        return null;
    }

    public function getRememberTokenName()
    {
        return null;
    }

    public function threads()
    {
        return $this->hasMany(Thread::class, 'author_id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'author_id');
    }
}
