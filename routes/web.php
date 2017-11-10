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
