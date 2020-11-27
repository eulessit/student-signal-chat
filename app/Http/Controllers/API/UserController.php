<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function authUser(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => $request->user()
        ]);
    }
}
