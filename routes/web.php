<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Auth::routes();
Route::view('/{any}', 'app')->where('any', '.*');

Auth::routes();
Route::get('/', 'App\Http\Controllers\ChatsController@index');
Route::get('/messages', 'App\Http\Controllers\ChatsController@fetchMessages');
Route::post('/messages', 'App\Http\Controllers\ChatsController@fetchMessages');