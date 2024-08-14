<?php

namespace App\Http\Controllers;

use App\Models\Engineer;
use App\Models\Engineer_Good_At;
use App\Models\Engineer_Token;
use App\Models\Engineer_Want_Work_At;
use App\Models\EngineerProfile;
use App\Models\Portfolio;
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
        // パスワード認証
        if (p_compare_password($validated['password'], $engineer->password)) {
            if ($validated['autoSignin']==true) {
                // ３０日以上前に作られたトークンを削除
                Engineer_Token::where("created_at","<",now()->subDays(30))->delete();
                // 新たにトークンを発行
                $token = Engineer_Token::create([
                    "token"=>make_token(),
                    "engineer_id" => $engineer->id,
                ]);
                return response()->json([
                    "result" => "pass",
                    "token" => $token->token,
                    "id"=>$engineer->id,
                    "email" => $engineer->email
                ]);
            }
            // オートログインなし
            else {
                return response()->json([
                    "result" => "pass",
                    "email" => $engineer->email,
                    "token" => "none",
                    "id"=>$engineer->id
                ]);
            }
        }
        // パスワードが間違っているときの処理
        else {
            return response()->json([
                "result"=>"password is wrong",
            ]);
        }
    }
    public function signin_engineer_account_by_token(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required',
            'token' => 'required',
        ]);
        // ３０日以上前に作られたトークンを削除
        Engineer_Token::where("created_at","<",now()->subDays(30))->delete();
        $engineer = Engineer::where("email",$validated["email"])->first();
        $tokens = Engineer_Token::where("engineer_id",$engineer->id)->get();
        foreach($tokens as $token){
            if ($token->token == $validated['token']) {
                // $token->update([
                //     "token" => make_token(),
                // ]);

                return response()->json([
                    "result" => "pass",
                    "token" => $token->token,
                    "id"=>$engineer->id,
                ]);
            }
        }
        return response()->json([
            "result" => false,
            "message" => "token auth failed",
        ],404);
    }
    public function get_engineer_info(Request $request)
    {
        $validated = $request->validate([
            'engineer_id' => 'required',
        ]);
        $engineer = Engineer::find($validated['id']);
        $engineer_profile = EngineerProfile::where("engineer_id",$validated["engineer_id"])->first();
        $engineer_good_ats = Engineer_Good_At::where("engineer_id",$validated["engineer_id"])->get();
        $portfolio = Portfolio::where("engineer_id",$validated["engineer_id"])->get();
        return response()->json([
            "engineer_profile" => $engineer_profile,
            "engineer_good_ats" => $engineer_good_ats,
            "portfolios" => $portfolio,
        ]);
    }

    public function update_engineer_account(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required',
            'work_experience' => 'required|numeric',
            'stacks' => 'required',
            'want_work_ats' => 'required'
        ]);
        $engineer = Engineer::find($validated['id']);
        $engineer_profile = EngineerProfile::where("engineer_id",$validated["id"])->first();
        $update_data = [
            "engineer_id" => $validated["id"],
            "name" => $validated["name"],
            "work_experience" => $validated["work_experience"],
        ];
        if($engineer_profile){
            $new_engineer_profile = $engineer_profile->update($update_data);
        }
        else {
            $new_engieer_profile = EngineerProfile::create($update_data);
        }
        // エンジニアの得意技術、働きたい場所をすべて取ってきていったん消す
        $engineer_good_at = Engineer_Good_At::where("engineer_id",$validated["id"])->get();
        $engineer_want_work_at = Engineer_Want_Work_At::where("engineer_id",$validated["id"])->get();

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
        ]);
        $engineer = Engineer::find($validated['id']);
        $engineer_profile = EngineerProfile::where("engineer_id",$validated["id"])->first();
        $engineer_good_at = Engineer_Good_At::where("engineer_id",$validated["id"])->get();
        $engineer_want_work_at = Engineer_Want_Work_At::where("engineer_id",$validated["id"])->get();
        $portfolio = Portfolio::where("engineer_id",$validated["id"])->get();

        $engineer_profile->delete();
        $engineer_good_at->each->delete();
        $engineer_want_work_at->each->delete();
        $portfolio->each->delete();
        $engineer->delete();

        return response()->json([
            "result"=>"sucessfull!",
        ]);
    }
}
