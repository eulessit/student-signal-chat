<?php

namespace App\Http\Controllers;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ChatsController extends Controller
{
    public function __construct()
	{
	  $this->middleware('auth');
	}
	/**
	 * Show chats
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
	  return view('chat');
	}

	/**
	 * Fetch all messages
	 *
	 * @return Message
	 */
	public function fetchMessages()
	{
	  return Chat::with('user')->get();
	}

	/**
	 * Persist message to database
	 *
	 * @param  Request $request
	 * @return Response
	 */
	public function sendMessage(Request $request)
	{
	  $user = Auth::user();

	  $message = $user->chats()->create([
	    'message' => $request->input('message')
	  ]);

	  broadcast(new MessageSent($user, $message))->toOthers();

	  return ['status' => 'Message Sent!'];
	}
}
