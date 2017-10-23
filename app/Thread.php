<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
