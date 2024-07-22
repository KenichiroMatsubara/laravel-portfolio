<?php

namespace App\Http\Controllers;

use App\Models\Favorite_From_Company;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class Favorite_From_Company_Controller extends Controller
{
    public function on_favorite(Request $request)
    {
        $validated = $request->validate([
            "company_id"=>"required",
            "engineer_id"=>"required",
        ]);
        $new_favorite = Favorite_From_Company::create([
            "company_id"=>$validated["company_id"],
            "engineer_id"=>$validated["engineer_id"],
        ]);
        return response()->json([
            "data"=>$new_favorite,
        ]);
    }
    public function off_favorite(Request $request)
    {
        $validated = $request->validate([
            "company_id"=>"required",
            "engineer_id"=>"required",
        ]);
        $delete_favorite = Favorite_From_Company::where("company_id",$validated["company_id"])->where("engineer_id",$validated["engineer_id"]);
        $delete_favorite->delete();
        return response()->json([
            "data"=>"successfull",
        ]);
    }
    public function get_favorite_from_company(Request $request)
    {
        $validated = $request->validate([
            "engineer_id"=>"required"
        ]);
        $engineers = Favorite_From_Company::where('engineer_id', $validated["engineer_id"])->get();
        $count = Favorite_From_Company::where('engineer_id', $validated["engineer_id"])->count();
        return response()->json([
            "data"=>"which engineer is favorite from is",
            "engineers"=>$engineers,
            "count"=>$count,
        ]);
    }
    public function get_engineer_company_favorite(Request $request)
    {
        $validated = $request->validate([
            "engineer_id"=>"required"
        ]);
        $companies = Favorite_From_Company::where('engineer_id', $validated["engineer_id"])->get();
        $count = Favorite_From_Company::where('engineer_id', $validated["engineer_id"])->count();
        return response()->json([
            "data"=>"who company favorite is here",
            "engineers"=>$companies,
            "count"=>$count,
        ]);
    }
}
