<?php

use App\Http\Controllers\API\PrivatMessageController;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Auth::routes();
Route::get('expo-1/{conversation}', [PrivatMessageController::class, 'getConversationMessages']);

Route::get('expo', function () {
    $participants = User::addSelect(['recent_message' => Message::select('content')
        ->whereColumn('user_id', 'users.id')
        ->orderBy('created_at')
        ->limit(1)])->get();
});
Route::view('/{any}', 'app')->where('any', '.*');
