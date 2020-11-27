<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ConversationController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\GroupController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\API\ParticipantController;
use App\Http\Controllers\API\GroupMessageController;
use App\Http\Controllers\API\PrivatMessageController;

Route::post('login', [LoginController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [LoginController::class, 'logout']);

    Route::get('/get-user', [UserController::class, 'authUser']);
    Route::get('/participants', [ParticipantController::class, 'participants']);

    Route::post('/groups', [GroupController::class, 'store']);

    Route::get('/groups', [GroupMessageController::class, 'getUserGroups']);
    Route::get('/groups/{group}/messages', [GroupMessageController::class, 'getGroupMessages']);
    Route::post('/groups/{group}/messages', [GroupMessageController::class, 'addGroupMessages']);

    Route::post('/create-conversation', [ConversationController::class, 'store']);
    Route::get('/conversations', [PrivatMessageController::class, 'getUserConversations']);
    Route::get('/conversations/{conversation}/messages', [PrivatMessageController::class, 'getConversationMessages']);
    Route::post('/conversations/{conversation}/messages', [PrivatMessageController::class, 'addConversationMessages']);
});
