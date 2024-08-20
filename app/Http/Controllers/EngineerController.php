<?php

namespace App\Http\Controllers;

use App\Models\Engineer;
use App\Models\EngineerGoodAt;
use App\Models\EngineerWantWorkAt;
use App\Models\EngineerProfile;
use App\Models\Portfolio;
use App\Models\Token;
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
        $new_token = Token::create([
            "role"=>"engineer_user",
            "user_id"=>$new_engineer->id,
            "expired"=>time()+3600*24*365,
        ]);
        return response()->json([
            "new_account"=>$new_engineer,
            "JWT token"=>make_jwt($new_token->role,$new_token->user_id,$new_token->id),
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
            if($validated["autoSignin"]==true){
                // 新たにトークンを発行
                $new_token = Token::create([
                    "role"=>"engineer_user",
                    "user_id"=>$engineer->id,
                    "expired"=>false,
                ]);

                return response()->json([
                    "result"=>"pass",
                    "token"=>make_jwt($new_token->role,$new_token->user_id,$new_token->id),
                    "email" => $engineer->email,
                    "data"=>$engineer,
                ]);
            }
            // オートログインをしないとき
            else {
                return response()->json([
                    "result" => "pass",
                    "email" => $engineer->email,
                    "token" => "none",
                    "id" => $engineer->id,
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

        if(check_token($validated["token"])["result"]==true){
            return response()->json([
                "result"=>"pass",
                "id"=>check_token($validated["token"])["id"],
                "token"=>$validated["token"]
            ]);
        }
        else {
            return response()->json([
                "result" => false,
                "message" => "token auth failed",
            ],401);
        }
    }
    public function get_engineer_info(Request $request)
    {
        $validated = $request->validate([
            'engineer_id' => 'required',
        ]);

        $engineer = Engineer::find($validated['engineer_id']);
        $engineer_profile = EngineerProfile::where("engineer_id",$validated["engineer_id"])->first();
        $engineer_want_work_ats = EngineerWantWorkAt::where("engineer_id",$validated["engineer_id"])->get();
        $engineer_good_ats = EngineerGoodAt::where("engineer_id",$validated["engineer_id"])->get();
        $portfolio = Portfolio::where("engineer_id",$validated["engineer_id"])->get();

        return response()->json([
            "engineer_profile" => $engineer_profile,
            "engineer_want_work_ats" => $engineer_want_work_ats,
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
            'stacks' => 'nullable|array',
            'want_work_ats' => 'nullable|array'
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
        $new_engieer_profile = EngineerProfile::where("engineer_id",$validated["id"])->first();
        // エンジニアの得意技術、働きたい場所をすべて取ってきていったん消す
        $engineer_good_ats = EngineerGoodAt::where("engineer_id",$validated["id"])->get();
        $engineer_want_work_ats = EngineerWantWorkAt::where("engineer_id",$validated["id"])->get();

        $engineer_good_ats->each->delete();
        $engineer_want_work_ats->each->delete();

        foreach ($validated["stacks"] as $stack) {
            EngineerGoodAt::create([
                "engineer_id" => $validated["id"],
                "stack"=>$stack,
            ]);
        }
        foreach ($validated["want_work_ats"] as $want_work_at) {
            EngineerWantWorkAt::create([
                "engineer_id" => $validated["id"],
                "place"=>$want_work_at,
            ]);
        }
        return response()->json([
            "new_engieer_profile"=>$new_engieer_profile,
            "engineer_want_work_ats" => $engineer_want_work_ats,
            "engineer_good_ats"=>$engineer_good_ats,
        ]);
    }
    public function destroy_engineer_account(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
        ]);
        $engineer = Engineer::find($validated['id']);
        $engineer_profile = EngineerProfile::where("engineer_id",$validated["id"])->first();
        $engineer_good_at = EngineerGoodAt::where("engineer_id",$validated["id"])->get();
        $engineer_want_work_at = EngineerWantWorkAt::where("engineer_id",$validated["id"])->get();
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
