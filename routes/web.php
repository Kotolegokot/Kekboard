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

Route::get('/', 'SectionController@index')->name('home');

Route::get('/login', 'LoginController@create')->name('login.form');
Route::post('/login', 'LoginController@store')->name('login');
Route::delete('/destroy', 'LoginController@destroy')->name('quit');

Route::get('/app', function () {
    return view('app');
});

Route::get('/{shorthand}', 'SectionController@show')->name('section');
