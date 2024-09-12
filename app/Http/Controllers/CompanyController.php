<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyUsingStack;
use App\Models\CompanyProfile;
use App\Models\Favorite;
use App\Models\Token;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function create_company_account(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|unique:companies',
            'password' => 'required',
        ]);
        $new_company = Company::create([
            "email" => $validated['email'],
            "password" => p_hash($validated['password']),
        ]);
        $new_token = Token::create([
            "role"=>"company_user",
            "user_id"=>$new_company->id,
            "expired"=>time()+3600*24*365,
            "salt"=>randstr(20),
        ]);
        return response()->json([
            "new_account"=>$new_company,
            "JWT token"=>make_jwt($new_token->role,$new_token->user_id,$new_token->id),
        ]);
    }

    public function signin_company_account_by_password(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required',
            'autoSignin' => 'required|boolean'
        ]);
        $company = Company::where("email", $validated['email'])->first();
        // パスワード認証
        if (p_compare_password($validated['password'], $company->password)) {
            if($validated["autoSignin"]==true){
                // 新たにトークンを発行
                $new_token = Token::create([
                    "role"=>"company_user",
                    "user_id"=>$company->id,
                    "expired"=>time()+3600*24*365,
                    "salt"=>randstr(20),
                ]);

                return response()->json([
                    "result"=>"pass",
                    "token"=>make_jwt($new_token->role,$new_token->user_id,$new_token->id),
                    "email" => $company->email,
                    "data"=>$company,
                ]);
            }
            // オートログインをしないとき
            else {
                return response()->json([
                    "result" => "pass",
                    "email" => $company->email,
                    "token" => "none",
                    "id" => $company->id,
                ]);
            }
        }
        // パスワードが間違っているときの処理
        else {
            return response()->json([
                "result" => "passsword is wrong"
            ]);
        }
    }
    public function signin_company_account_by_token(Request $request)
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
                "messages"=>"failed signin company account by token",
            ],401);
        }
    }
    public function get_company_info(Request $request)
    {
        $validated = $request->validate([
            "id" => "required",
        ]);
        $company = Company::find($validated['id']);
        $company_profile = CompanyProfile::where("company_id",$validated["id"])->first();
        $company_using_stacks = CompanyUsingStack::where("company_id",$validated["id"])->get();
        return response()->json([
            "company_data" => $company,
            "company_profile" => $company_profile,
            "company_using_stacks" => $company_using_stacks,
        ]);
    }
    public function update_company_account(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required',
            'email' => 'required|email',
            'address' => 'required',
            'explain' => 'required',
            'file' => 'required|image',  // 'file' が画像であることを確認
            'homepageURL' => 'required|url',
            'stacks' => 'required|array',
        ]);

        $update_data = [
            "company_id" => $validated["id"],
            "name" => $validated['name'] ?? "blank",
            "address" => $validated['address'] ?? "blank",
            "explain" => $validated['explain'] ?? "blank",
            "homepageURL" => $validated['homepageURL'] ?? "blank",
            "imgURL" => $request->file('img')->store('public/image/'),  // 'file' に変更
        ];

        $company_profile = CompanyProfile::where("company_id",$validated["id"])->first();
        if($company_profile){
            $new_company_profile = $company_profile->update($update_data);
        }
        else {
            $new_company_profile = CompanyProfile::create($update_data);
        }


        // スタックを削除してから追加
        CompanyUsingStack::where("company_id", $validated["id"])->delete();

        foreach ($validated['stacks'] as $stack) {
            CompanyUsingStack::create([
                "company_id" => $validated["id"],
                "stack" => $stack,
            ]);
        }

        $company_using_stacks = CompanyUsingStack::where("company_id", $validated["id"])->get();

        return response()->json([
            "updated_data" => $new_company_profile,
            "stacks" => $company_using_stacks,
        ]);
    }
    public function destroy_company_account(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
            "email" => 'required',
        ]);
        $company = Company::find($validated['id']);
        $company_profile = CompanyProfile::where("company_id",$validated["id"])->first();
        $company_profile->delete();
        $company_using_stacks = CompanyUsingStack::where("company_id",$company->id)->get();
        $company_using_stacks->each->delete();
        $company->delete();
        return response()->json([
            "result"=>"sucessfull!",
        ]);
    }
    public function search_companies(Request $request)
    {
        $validated = $request->validate([
            'engineer_id' => 'required|numeric',
            'search_input' => 'required|string',
        ]);
        $companies = collect();
        $search_input = strtolower($validated['search_input']);

        // 名前検索
        $searching_companies = Company::whereHas('company_profile',function($query) use ($search_input){
            $query->whereRaw("LOWER(name) LIKE ?",["%$search_input%"]);
        })->distinct()->get();

        foreach($searching_companies as $searching_company) {
            $favorited = Favorite::where("engineer_id",$validated["engineer_id"])
                ->where("company_id",$searching_company->id)
                ->where("type","e_to_c")
                ->first();

            $companies->push([
                "id"=> $searching_company->id,
                "company" => $searching_company,
                "profile" => $searching_company->company_profile,
                "using_stacks" => $searching_company->company_using_stacks,
                "favorited" => $favorited ? true : false,
            ]);
        }

        // 住所検索
        $searching_companies = Company::whereHas('company_profile',function($query) use ($search_input){
            $query->whereRaw("LOWER(address) LIKE ?",["%$search_input%"]);
        })->distinct()->get();

        foreach($searching_companies as $searching_company) {
            $favorited = Favorite::where("engineer_id",$validated["engineer_id"])
                ->where("company_id",$searching_company->id)
                ->where("type","e_to_c")
                ->first();

            $companies->push([
                "id"=> $searching_company->id,
                "company" => $searching_company,
                "profile" => $searching_company->company_profile,
                "using_stacks" => $searching_company->company_using_stacks,
                "favorited" => $favorited ? true : false,
            ]);
        }

        // 技術検索
        $searching_companies = Company::whereHas('company_using_stacks',function($query) use ($search_input){
            $query->whereRaw("LOWER(stack) LIKE ?",["%$search_input%"]);
        })->distinct()->get();

        foreach($searching_companies as $searching_company) {
            $favorited = Favorite::where("engineer_id",$validated["engineer_id"])
                ->where("company_id",$searching_company->id)
                ->where("type","e_to_c")
                ->first();

            $companies->push([
                "id"=> $searching_company->id,
                "company" => $searching_company,
                "profile" => $searching_company->company_profile,
                "using_stacks" => $searching_company->company_using_stacks,
                "favorited" => $favorited ? true : false,
            ]);
        }

        // 説明検索
        $searching_companies = Company::whereHas('company_profile',function($query) use ($search_input){
            $query->whereRaw("LOWER(`explain`) LIKE ?",["%$search_input%"]);
        })->distinct()->get();

        foreach($searching_companies as $searching_company) {
            $favorited = Favorite::where("engineer_id",$validated["engineer_id"])
                ->where("company_id",$searching_company->id)
                ->where("type","e_to_c")
                ->first();

            $companies->push([
                "id"=> $searching_company->id,
                "company" => $searching_company,
                "profile" => $searching_company->company_profile,
                "using_stacks" => $searching_company->company_using_stacks,
                "favorited" => $favorited ? true : false,
            ]);
        }

        // idが被っている会社を削除
        $companies = $companies->unique('id')->values();

        return response()->json([
            "result" => true,
            "companies" => $companies,
        ]);
    }
}
