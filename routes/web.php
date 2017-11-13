<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;

Route::get('/', function () {
  return view('app');
})->name('home');

Route::get('/login', 'LoginController@create')->name('login.create');
Route::post('/login', 'LoginController@store')->name('login.store');
Route::get('/logout', 'LoginController@destroy')->name('logout');

Route::get('/user', function (Request $request) {
  return Auth::check() ? $request->user() : abort(406);
});

Route::get('/user/{user}', function (Request $request, App\User $user) {
  return Auth::check() ? $user : abort(406);
});

Route::get('/post/{post}', function (Request $request, App\Post $post) {
  return Auth::check() ? $post : abort(406);
});

Route::get('/sections', function (Request $request) {
  return Auth::check() ? App\Section::all() : abort(406);
});

Route::get('/threads/{section}', function (Request $request, App\Section $section) {
  return Auth::check() ? $section->threads : abort(406);
});

Route::post('/threads/create', function (Request $request) {
  $request->validate([
    'name' => 'required|min:1|max:255|unique:threads,name',
    'section' => 'required|exists:sections,id',
    'first_post_body' => 'required|min:1'
  ]);

  $section = App\Section::find($request->section);

  $thread = new App\Thread;
  $thread->name = $request->name;
  $thread->section_id = $section->id;
  $thread->author_id = Auth::id();
  $thread->save();

  $post = new App\Post;
  $post->body = $request->first_post_body;
  $post->thread_id = $thread->id;
  $post->answers_to_post_id = 0;
  $post->author_id = Auth::id();
  $post->save();

  return [];
});

Route::get('/posts/{thread}', function (Request $request, App\Thread $thread) {
  if (Auth::guest()) {
    return abort(406);
  }

  $posts_ = $thread->posts->sortByDesc(function ($post) {
    return new DateTime($post->created_at);
  });

  $posts = [];

  foreach ($posts_->keys() as $key) {
    array_push($posts, $posts_[$key]);
  }

  return $posts;
});

Route::post('/posts/create', function (Request $request) {
  $request->validate([
    'body' => 'required|min:1',
    'thread' => 'required|exists:threads,id'
  ]);

  $thread = App\Thread::find($request->thread);

  if (!$request->answers_to_post) {
    $request->answers_to_post = 0;
  }

  $post = new App\Post;
  $post->body = $request->body;
  $post->thread_id = $thread->id;
  $post->answers_to_post_id = $request->answers_to_post;
  $post->author_id = Auth::id();
  $post->save();

  return [];
});
