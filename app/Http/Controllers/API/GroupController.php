<?php

namespace App\Http\Controllers\API;

use App\Models\Group;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GroupController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'group_name' => 'required',
            'participants' => 'array'
        ]);

        $group = $user->groups()->save(new Group([
            'name' => $data['group_name']
        ]));

        $group->participants()->sync($data['participants']);

        return response()->json([
            'status' => 'success',
            'data' => $group,
        ]);
    }
}
