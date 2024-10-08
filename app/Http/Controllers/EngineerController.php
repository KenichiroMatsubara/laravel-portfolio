<?php

namespace App\Http\Controllers;

use App\Models\Engineer;
use App\Models\EngineerGoodAt;
use App\Models\EngineerWantWorkAt;
use App\Models\EngineerProfile;
use App\Models\Favorite;
use App\Models\Portfolio;
use App\Models\Token;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class EngineerController extends Controller
{
    public function create_engineer_account(Request $request)
    {
        $validated = $request->validate([
            "email" => "required|unique:engineers",
            "password" => "required",
        ]);
        $new_engineer = Engineer::create([
            "email" => $validated["email"],
            "password" => p_hash($validated["password"]),
        ]);
        $new_token = Token::create([
            "role"=>"engineer_user",
            "user_id"=>$new_engineer->id,
            "expired"=>time()+3600*24*365,
            "salt"=>randstr(20),
        ]);
        return response()->json([
            "new_account"=>$new_engineer,
            "JWT token"=>make_jwt($new_token->role,$new_token->user_id,$new_token->id),
        ]);
    }

    public function signin_engineer_account_by_password(Request $request)
    {
        $validated = $request->validate([
            "email" => "required",
            "password" => "required",
            "autoSignin" => "required|boolean",
        ]);
        $engineer = Engineer::where("email", $validated["email"])->first();
        // パスワード認証
        if (p_compare_password($validated["password"], $engineer->password)) {
            if($validated["autoSignin"]==true){
                // 新たにトークンを発行
                $new_token = Token::create([
                    "role"=>"engineer_user",
                    "user_id"=>$engineer->id,
                    "expired"=>time()+3600*24*365,
                    "salt"=>randstr(20),
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
            "email" => "required",
            "token" => "required",
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
            "engineer_id" => "required",
        ]);

        $engineer = Engineer::find($validated["engineer_id"]);
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
            "id" => "required|numeric",
            "name" => "required",
            "work_experience" => "required|numeric",
            "stacks" => "nullable|array",
            "want_work_ats" => "nullable|array"
        ]);

        $engineer = Engineer::find($validated["id"]);
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
            "id" => "required|numeric",
        ]);
        $engineer = Engineer::find($validated["id"]);
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
    public function search_engineers(Request $request)
    {
        $validated = $request->validate([
            "search_input" => "nullable|string",
            "search_key" => "required|string",
            "company_id" => "required|numeric"
        ]);

        $engineer_infos = collect(); // Laravel Collection を使用
        $search_input = strtolower($validated['search_input']);

        if ($validated["search_key"] == "all") {
            // 名前検索
            $searching_engineer_profiles = EngineerProfile::whereRaw("LOWER(name) LIKE ?", ["%$search_input%"])
                ->get();
            foreach($searching_engineer_profiles as $searching_engineer_profile)
            {
                $favorited = Favorite::where("company_id", $validated["company_id"])
                    ->where("engineer_id", $searching_engineer_profile->engineer_id)
                    ->where("type", "c_to_e")
                    ->first();

                $engineer_infos->push([
                    "id" => $searching_engineer_profile->engineer_id,
                    "engineer" => $searching_engineer_profile->engineer,
                    "profile" => $searching_engineer_profile,
                    "using_stacks" => $searching_engineer_profile->engineer->engineer_good_ats,
                    "want_work_ats" => $searching_engineer_profile->engineer->engineer_want_work_ats,
                    "favorited" => $favorited ? true : false,
                ]);
            }

            // スタック検索
            $searching_engineers = Engineer::whereHas('engineer_good_ats', function($query) use ($search_input) {
                $query->whereRaw('LOWER(stack) LIKE ?', ["%$search_input%"]);
            })->distinct()->get();

            foreach ($searching_engineers as $searching_engineer) {
                $favorited = Favorite::where("company_id", $validated["company_id"])
                    ->where("engineer_id", $searching_engineer->id)
                    ->where("type", "c_to_e")
                    ->first();

                $engineer_infos->push([
                    "id" => $searching_engineer->id,
                    "engineer" => $searching_engineer,
                    "profile" => $searching_engineer->engineer_profile,
                    "using_stacks" => $searching_engineer->engineer_good_ats,
                    "want_work_ats" => $searching_engineer->engineer_want_work_ats,
                    "favorited" => $favorited ? true : false,
                ]);
            }

            // 場所検索
            $searching_engineers = Engineer::whereHas('engineer_want_work_ats', function($query) use ($search_input) {
                $query->whereRaw('LOWER(place) LIKE ?', ["%$search_input%"]);
            })->distinct()->get();

            foreach ($searching_engineers as $searching_engineer) {
                $favorited = Favorite::where("company_id", $validated["company_id"])
                    ->where("engineer_id", $searching_engineer->id)
                    ->where("type", "c_to_e")
                    ->first();

                $engineer_infos->push([
                    "id" => $searching_engineer->id,
                    "engineer" => $searching_engineer,
                    "profile" => $searching_engineer->engineer_profile,
                    "using_stacks" => $searching_engineer->engineer_good_ats,
                    "want_work_ats" => $searching_engineer->engineer_want_work_ats,
                    "favorited" => $favorited ? true : false,
                ]);
            }

            // 重複する ID を削除
            $engineer_infos = $engineer_infos->unique('id')->values();
        } else {
            // 他の検索キー（name, stack, place）の処理は既存のまま
            if ($validated["search_key"] == "name") {
                $searching_engineer_profiles = EngineerProfile::whereRaw("LOWER(name) LIKE ?", ["%$search_input%"])
                    ->get();
                foreach($searching_engineer_profiles as $searching_engineer_profile)
                {
                    $favorited = Favorite::where("company_id", $validated["company_id"])
                        ->where("engineer_id", $searching_engineer_profile->engineer_id)
                        ->where("type", "c_to_e")
                        ->first();
                    $engineer_infos[] = [
                        "id" => $searching_engineer_profile->engineer->id,
                        "engineer" => $searching_engineer_profile->engineer,
                        "profile" => $searching_engineer_profile,
                        "using_stacks" => $searching_engineer_profile->engineer->engineer_good_ats,
                        "want_work_ats" => $searching_engineer_profile->engineer->engineer_want_work_ats,
                        "favorited" => $favorited ? true : false,
                    ];
                }
            } elseif ($validated["search_key"] == "stack") {
                $searching_engineers = Engineer::whereHas('engineer_good_ats', function($query) use ($search_input) {
                    $query->whereRaw('LOWER(stack) LIKE ?', ["%$search_input%"]);
                })->distinct()->get();
                foreach ($searching_engineers as $searching_engineer) {
                    $favorited = Favorite::where("company_id", $validated["company_id"])
                        ->where("engineer_id", $searching_engineer->id)
                        ->where("type", "c_to_e")
                        ->first();
                    $engineer_infos[] = [
                        "id" => $searching_engineer->id,
                        "engineer" => $searching_engineer,
                        "profile" => $searching_engineer->engineer_profile,
                        "using_stacks" => $searching_engineer->engineer_good_ats,
                        "want_work_ats" => $searching_engineer->engineer_want_work_ats,
                        "favorited" => $favorited ? true : false,
                    ];
                }
            } elseif ($validated["search_key"] == "place") {
                $searching_engineers = Engineer::whereHas('engineer_want_work_ats', function($query) use ($search_input) {
                    $query->whereRaw('LOWER(place) LIKE ?', ["%$search_input%"]);
                })->distinct()->get();
                foreach ($searching_engineers as $searching_engineer) {
                    $favorited = Favorite::where("company_id", $validated["company_id"])
                        ->where("engineer_id", $searching_engineer->id)
                        ->where("type", "c_to_e")
                        ->first();
                    $engineer_infos[] = [
                        "id" => $searching_engineer->id,
                        "engineer" => $searching_engineer,
                        "profile" => $searching_engineer->engineer_profile,
                        "using_stacks" => $searching_engineer->engineer_good_ats,
                        "want_work_ats" => $searching_engineer->engineer_want_work_ats,
                        "favorited" => $favorited ? true : false,
                    ];
                }
            }
        }

        return response()->json([
            "result" => true,
            "engineer_infos" => $engineer_infos,
        ]);
    }

}
