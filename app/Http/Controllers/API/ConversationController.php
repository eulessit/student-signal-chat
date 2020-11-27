<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'participants' => 'array'
        ]);

        $user_id = $user->id;
        $receiver_id = $data['participants'][0];

        $conversation = Conversation::where(function ($q) use ($user_id, $receiver_id) {
            $q->where('sender_id', $user_id)
                ->where('receiver_id', $receiver_id);
        })->orWhere(function ($q) use ($user_id, $receiver_id) {
            $q->where('sender_id', $receiver_id)
                ->where('receiver_id', $user_id);
        })->first();

        if (!$conversation) {
            $conversation = Conversation::updateorCreate([
                'sender_id' => $user->id,
                'receiver_id' => $data['participants'][0]
            ]);
        }

        $conversation = $conversation
            ->with(['private_messages', 'sender:id,name', 'receiver:id,name'])
            ->where('id', $conversation->id)
            ->first();

        return response()->json([
            'status' => 'success',
            'data' => $conversation,
        ]);
    }
}
