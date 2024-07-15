<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ChatController extends Controller
{
    public function create_chat(Request $request)
    {
        $validated = $request->validate([
            "engineer_id"=>"required",
            "company_id"=>"required",
            "type"=>"required",
            "text"=>"required"
        ]);
        $new_chat = Chat::create([
            "engineer_id"=>$validated["engineer_id"],
            "company_id"=>$validated["company_id"],
            "type"=>$validated["type"],
            "text"=>$validated["text"]
        ]);
        return response()->json([
            "new chat"=>$new_chat
        ]);
    }
    public function update_chat(Request $request)
    {
        $validated = $request->validate([
            "id"=>"required",
            "text"=>"required"
        ]);

        $updating_chat = Chat::find($validated["id"]);
        $updating_chat->update([
            "text"=>$validated["text"]
        ]);
        return response()->json([
            "updated chat"=>$updating_chat
        ]);
    }
    public function destroy_chat(Request $request)
    {
        $validated = $request->validate([
            "id"=>"required",
        ]);

        $updating_chat = Chat::find($validated["id"]);
        $updating_chat->delete();
        return response()->json([
            "result"=>"successfully destroyed!"
        ]);
    }
    public function get_company_id_which_send(Request $request)
    {
        $validated = $request->validate([
            "engineer_id"=>"required",
        ]);
        $chat_engineer_get = Chat::where("engineer_id",$validated["engineer_id"]);
        $company_ids = $chat_engineer_get->pluck("company_id");
        return response()->json([
            "company_id"=>$company_ids
        ]);
    }
    public function get_engineer_id_which_company_send(Request $request)
    {
        $validated = $request->validate([
            "company_id"=>"required",
        ]);
        $chat_company_send = Chat::where("company_id",$validated["company_id"]);
        $engineer_ids = $chat_company_send->pluck("engineer_id");
        return response()->json([
            "engineer_id"=>$engineer_ids
        ]);
    }
    public function get_chat(Request $request)
    {
        $validated = $request->validate([
            "company_id"=>"required",
            "engineer_id"=>"required",
        ]);
        $chats = Chat::where("company_id",$validated["company_id"])
            ->where("engineer_id",$validated["engineer_id"]);
        return response()->json([
            "chats"=>$chats
        ]);
    }
}
