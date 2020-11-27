<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = $request->user();
            $data['token'] = $user->createToken(env('APP_NAME'))->accessToken;
            $data['user'] = $user;
            return response()->json(['data' => $data], 200);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function logout(Request $request)
    {
        if (Auth()->check()) {
            $request->user()->token()->revoke();
            return response()->json(['success' => 'Logged out successfuly']);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }
}
