<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function authUser(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => $request->user()
        ]);
    }

    public function participants()
    {
        $participants = User::where('id', '!=', Auth::id())->get();

        return response()->json([
            'status' => 'success',
            'data' => $participants
        ]);
    }
}
