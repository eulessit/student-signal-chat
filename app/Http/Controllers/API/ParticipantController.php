<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ParticipantController extends Controller
{
    public function participants(Request $request)
    {
        $user = $request->user();
        $participants = User::where('id', '!=', $user->id)->get();

        return response()->json([
            'status' => 'success',
            'data' => $participants
        ]);
    }
}
