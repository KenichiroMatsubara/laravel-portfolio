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
            "engineer_id"=>"required|numeric",
            "company_id"=>"required|numeric",
            "type"=>"required|string",
            "text"=>"required|string"
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
    public function get_company_id_by_engineer_id(Request $request)
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
    public function get_engineer_id_by_company_id(Request $request)
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
            "company_id"=>"required|numeric",
            "engineer_id"=>"required|numeric",
        ]);
        $chats = Chat::where("company_id",$validated["company_id"])
            ->where("engineer_id",$validated["engineer_id"])
            ->get();
        $formatted_chats = [];
        foreach($chats as $chat) {
            $formatted_chats[] = [
                "id" => $chat->id,
                "text" => $chat->text,
                "createdAt" => $chat->created_at,
                "updated" => $chat->updated_at,
                "type" => $chat->type,
                "readed" => false,
            ];
        }
        return response()->json([
            "chats"=>$formatted_chats,
        ]);
    }
}
