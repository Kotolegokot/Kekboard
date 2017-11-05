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

Route::get('/', function () {
    return view('app');
})->name('home');

Route::get('/login', 'LoginController@create')->name('login.create');
Route::post('/login', 'LoginController@store')->name('login.store');
Route::get('/logout', 'LoginController@destroy')->name('logout');
