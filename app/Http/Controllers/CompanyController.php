<?php
namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyToken;
use App\Models\CompanyUsingStack;
use App\Models\CompanyProfile;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

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
            "expired"=>false,
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
                    "expired"=>false,
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
            "imgURL" => $request->file('file')->store('public/image/'),  // 'file' に変更
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
}
