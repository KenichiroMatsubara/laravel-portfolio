<?php
namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Company_Token;
use App\Models\Company_Using_Stack;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CompanyController extends Controller
{
    public function create_company_account(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:companies',
            'password' => 'required',
        ]);
        Company::create([
            "name" => $validated['name'],
            "password" => p_hash($validated['password']),
        ]);
    }

    public function signin_company_account_by_password(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        $company = Company::where("email", $validated['email'])->first();
        if (p_compare_password($validated['password'], $company->password)) {
            // ３０日以上前に作られたトークンを削除
            $deleteToken = Company_Token::where("created_at","<",now()->subDays(30))->where("company_id",1);
            $deleteToken->delete();
            // 新たにトークンを発行
            $token = Company_Token::create([
                "token"=>make_token(),
                "company_id" => $company->id,
            ]);
            return response()->json([
                "result"=>"pass",
                "token"=>$token->token,
                "data"=>$company,
            ]);
        }
    }
    public function signin_company_account_by_token(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required',
            'token' => 'required',
        ]);
        $company = Company::where("email", $validated['email'])->first();
        $tokens = Company_Token::where("company_id", $company->id)->get();
        foreach ($tokens as $token) {
            if ($token->token == $validated['token']) {
                $token->update([
                    "token" => make_token(),
                ]);

                return response()->json([
                    "result" => "pass",
                    "data" => $company,
                    "token" => $token->token,
                ]);
            }
        }
    }
    public function get_company_info(Request $request)
    {
        $validated = $request->validate([
            "id" => "required",
        ]);
        $company = Company::find($validated['id']);
        $company_using_stacks = $company->company_using_stacks();
        return response()->json([
            "company_data" => $company,
            "company_using_stacks" => $company_using_stacks,
        ]);
    }

    public function update_company_account(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required',
            'email' => 'required',
            'address' => 'required',
            'explain' => 'required',
            'file' => 'required',
            'homepageURL' => 'required',
            "stacks" => 'required',
        ]);
        $company = Company::find($validated['id']);
        $company->update([
            "name" => $validated['name'],
            "email" => $validated['email'],
            "address" => $validated['address'],
            "explain" => $validated['explain'],
            "homepageURL" => $validated['homepageURL'],
            "imgURL" => $request->file('image')->store('public/image/'),
        ]);
        $company_using_stacks = Company_Using_Stack::where("company_id",$company->id)->get();
        $company_using_stacks->each->delete();
        foreach ($request->stacks as $stack) {
            Company_Using_Stack::create([
                "company_id" => $company->id,
                "stack"=>$stack,
            ]);
        }
        $company_using_stacks = Company_Using_Stack::where("company_id",$company->id)->get();
        return response()->json([
            "updated_data"=>$company,
            "stacks"=>$company_using_stacks,
        ]);
    }
    public function destroy_company_account(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required',
            "email" => 'required',
        ]);
        $company = Company::find($validated['id']);
        $company_using_stacks = Company_Using_Stack::where("company_id",$company->id)->get();
        $company_using_stacks->each->delete();
        $company->delete();
        return response()->json([
            "result"=>"sucessfull!",
        ]);
    }
}
