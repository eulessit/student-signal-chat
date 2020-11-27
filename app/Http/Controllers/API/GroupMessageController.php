<?php

namespace App\Http\Controllers\API;

use App\Events\GroupMessageSent;
use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\GroupMessage;
use App\Models\GroupUser;
use Illuminate\Http\Request;

class GroupMessageController extends Controller
{
    public function getUserGroups(Request $request)
    {
        $user = $request->user();

        $group_ids = GroupUser::where('user_id', $user->id)->pluck('group_id')->toArray();
        $groups = Group::with(['participants'])
            ->whereIn('id', $group_ids)
            ->orWhere('user_id', $user->id)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $groups
        ]);
    }

    public function getGroupMessages(Request $request, Group $group)
    {
        $group = $group
            ->with(['participants', 'group_messages' => function ($query) {
                return $query->with(['sender']);
            }])
            ->where('id', $group->id)
            ->first();

        return response()->json([
            'status' => 'success',
            'data' => $group
        ]);
    }

    public function addGroupMessages(Request $request, Group $group)
    {
        $user = $request->user();

        $data = $request->validate([
            'content' => 'required'
        ]);

        $groupMessage = $group->group_messages()->save(new GroupMessage([
            'user_id' => $user->id,
            'content' => $data['content'],
        ]));
        $groupMessage = GroupMessage::where('id', $groupMessage->id)->with(['sender'])->first();

        event(new GroupMessageSent($group, $groupMessage));

        return response()->json([
            'status' => 'success',
            'data' => $groupMessage,
        ]);
    }
}
