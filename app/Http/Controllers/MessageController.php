<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::all();

        $sender = Auth::user();
        $messages = $messages->map(function ($message) use ($sender) {
            $message->sender = $sender->id === $message->user_id;
            try {
                $message->content = decrypt($message->content);
            } catch(\Exception $e) {}
            return $message;
        });

        return response()->json([
            'status' => 'success',
            'data' => $messages
        ]);
    }

    public function store(Request $request)
    {
        $sender = Auth::user();
        $receiver = $sender->id === 1 ? User::find(2) : User::find(1);

        $conversation = Conversation::where('receiver_id', $receiver->id)->where('sender_id', $sender->id)->first();
        if (!$conversation) {
            $conversation = Conversation::where('receiver_id', $sender->id)->where('sender_id', $receiver->id)->first();
        }

        if (!$conversation) {
            $conversation = Conversation::create(['sender_id' => $sender->id, 'receiver_id' => $receiver->id]);
        }

        $message = Message::create([
            'user_id' => $sender->id,
            'conversation_id' => $conversation->id,
            'content' => encrypt($request->get('content'))
        ]);

        $message->sender = true;

        try {
            $message->content = $request->get('content');
        } catch(\Exception $e) {}

        return response()->json([
            'status' => 'success',
            'data' => $message,
        ]);
    }
}
