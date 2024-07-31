<?php

namespace App\Http\Controllers;

use App\Models\Engineer;
use App\Models\Engineer_Good_At;
use App\Models\Engineer_Token;
use App\Models\Engineer_Want_Work_At;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class EngineerController extends Controller
{
    public function create_engineer_account(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|unique:engineers',
            'password' => 'required',
        ]);
        $new_engineer = Engineer::create([
            "name" => $validated['name'],
            "email" => $validated['email'],
            "password" => p_hash($validated['password']),
        ]);
        return response()->json([
            "new engineer"=>$new_engineer
        ]);
    }

    public function signin_engineer_account_by_password(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required',
            'autoSignin' => 'required|boolean',
        ]);
        $engineer = Engineer::where("email", $validated['email'])->first();
        if (p_compare_password($validated['password'], $engineer->password)) {
            if ($validated['autoSignin']==true) {
                $token = Engineer_Token::create([
                    "token" => make_token(),
                    "engineer_id" => $engineer->id,
                ]);
                return response()->json([
                    "result" => "pass",
                    "token" => $token->token,
                    "id"=>$engineer->id,
                ]);
            } else {
                return response()->json([
                    "result" => "pass",
                    "token" => "none",
                    "id"=>$engineer->id
                ]);
            }
        }
        else {
            return response()->json([
                "result"=>"password is wrong"
            ]);
        }
    }
    public function signin_engineer_account_by_token(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required',
            'token' => 'required',
        ]);
        $engineer = Engineer::where("email", $validated['email'])->first();
        $token = Engineer_Token::find($engineer->id);
        if ($token->token == $validated['token']) {
            $token->update([
                "token" => hash("sha224", randstr(20)),
            ]);

            return response()->json([
                "result" => "pass",
                "token" => $token->token,
                "id"=>$engineer->id,
            ]);
        }
    }
    public function get_engineer_info(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required',
        ]);
        $engineer = Engineer::find($validated['id']);
        $engineer_good_ats = $engineer->engineer_good_at();
        $portfolio = $engineer->portfolios();
        return response()->json([
            "engineer_info" => $engineer,
            "engineer_good_ats" => $engineer_good_ats,
            "portfolios" => $portfolio,
        ]);
    }

    public function update_engineer_account(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required',
            "stacks" => 'required',
            "want_work_ats" => "required"
        ]);
        $engineer = Engineer::find($validated['id']);

        $engineer->update([
            "name" => $validated['name'],
        ]);
        // エンジニアの得意技術、働きたい場所をすべて取ってきていったん消す
        $engineer_good_at = $engineer->engineer_good_at();
        $engineer_want_work_at = $engineer->engineer_want_work_at();

        $engineer_good_at->each->delete();
        $engineer_want_work_at->each->delete();

        foreach ($validated["stacks"] as $stack) {
            Engineer_Good_At::create([
                "engineer_id" => $engineer->id,
                "stack"=>$stack,
            ]);
        }
        foreach ($validated["want_work_ats"] as $want_work_at) {
            Engineer_Want_Work_At::create([
                "engineer_id" => $engineer->id,
                "place"=>$want_work_at,
            ]);
        }
        // もう一回作り直す
        $engineer_good_at = $engineer->engineer_good_at();
        return response()->json([
            "name"=>$engineer->name,
            "stacks"=>$engineer_good_at,
        ]);
    }
    public function destroy_engineer_account(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required',
            "email" => 'required',
        ]);
        $engineer = Engineer::find($validated['id']);
        $engineer_good_at = $engineer->engineer_good_at();
        $engineer_want_work_at = $engineer->engineer_want_work_at();
        $portfolio = $engineer->portfolios();

        $engineer_good_at->each->delete();
        $engineer_want_work_at->each->delete();
        $portfolio->each->delete();
        $engineer->delete();

        return response()->json([
            "result"=>"sucessfull!",
        ]);
    }
}
