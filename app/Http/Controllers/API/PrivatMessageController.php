<?php

namespace App\Http\Controllers\API;

use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Events\NewMessageSent;
use App\Models\PrivateMessage;
use App\Http\Controllers\Controller;

class PrivatMessageController extends Controller
{
    public function getUserConversations(Request $request)
    {
        $user = $request->user();

        $conversations = Conversation::with(['sender:id,name', 'receiver:id,name'])
            ->where('receiver_id', $user->id)
            ->orWhere('sender_id', $user->id)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $conversations
        ]);
    }

    public function getConversationMessages(Conversation $conversation)
    {
        $conversation = $conversation
            ->with(['private_messages', 'sender:id,name', 'receiver:id,name'])
            ->where('id', $conversation->id)
            ->first();

        return response()->json([
            'status' => 'success',
            'data' => $conversation
        ]);
    }

    public function addConversationMessages(Request $request, Conversation $conversation)
    {
        $user = $request->user();

        $data = $request->validate([
            'content' => 'required'
        ]);

        $message = $user->private_messages()->save(new PrivateMessage([
            'conversation_id' => $conversation->id,
            'content' => $data['content'],
        ]));

        event(new NewMessageSent($conversation, $message));

        return response()->json([
            'status' => 'success',
            'data' => $message,
        ]);
    }
}
