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
}
