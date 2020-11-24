<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{

    protected $redirectTo = '/';
    public function login(Request $request)
    {
        
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
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
            return response()->json(['success' => ' Logged out successfuly']);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }
}
