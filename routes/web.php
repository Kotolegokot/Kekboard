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

Route::get('/sections', function (Request $request) {
    return Auth::check() ? App\Section::all() : abort(406);
});

Route::get('/threads/{section}', function (Request $request, App\Section $section) {
    return Auth::check() ? $section->threads : abort(406);
});

Route::post('/threads/create', function (Request $request) {
  /*if (App\Thread::where('name', $request->name)->first()) {
    return abort(403, "A thread with that name already exists!");
}*/

  $request->validate([
    'name' => 'required|min:1|max:255|unique:threads,name',
    'section' => 'required|exists:sections,id',
  ]);

  $section = App\Section::find($request->section);

  $thread = new App\Thread;
  $thread->name = $request->name;
  $thread->section_id = $section->id;
  $thread->author_id = Auth::id();
  $thread->save();

  return [];
});
