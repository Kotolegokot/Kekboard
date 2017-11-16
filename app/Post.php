<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  protected $hidden = [
    'author_id'
  ];

  public function thread()
  {
    return $this->belongsTo(Thread::class);
  }

  public function author()
  {
    return $this->belongsTo(User::class, 'author_id');
  }

  public function answersToPost()
  {
    return $this->hasOne(Post::class, 'answers_to_post_id');
  }

  public function isMain()
  {
    return $this->answers_to_post === 0;
  }
}
