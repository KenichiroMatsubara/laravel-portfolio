<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Engineer;
use App\Models\Favorite;
use DB;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB as FacadesDB;

class FavoriteController extends Controller
{
    public function create_favorite(Request $request)
    {
        $validated = $request->validate([
            "company_id"=>"required|numeric",
            "engineer_id"=>"required|numeric",
            "type"=>"required|string",
        ]);
        $favorite = Favorite::where("company_id",$validated["company_id"])
            ->where("engineer_id",$validated["engineer_id"])
            ->where("type",$validated["type"])
            ->first();
        if($favorite){
            return response()->json([
                "result"=>true,
                "message"=>"the favorite already exist"
            ]);
        }
        $new_favorite = Favorite::create([
            "company_id"=>$validated["company_id"],
            "engineer_id"=>$validated["engineer_id"],
            "type"=>$validated["type"],
        ]);
        return response()->json([
            "result"=>true,
            "new_favorite"=>$new_favorite,
        ]);
    }
    public function destroy_favorite(Request $request)
    {
        $validated = $request->validate([
            "company_id"=>"required|numeric",
            "engineer_id"=>"required|numeric",
            "type"=>"required|string",
        ]);

        $favorite = Favorite::where("company_id",$validated["company_id"])
            ->where("engineer_id",$validated["engineer_id"])
            ->where("type",$validated["type"])
            ->first();
        if($favorite){
            $favorite->delete();
            return response()->json([
                "result"=>true,
                "message"=>"the favorite destroyed successfully!"
            ]);
        }
        else {
            return response()->json([
                "result"=>true,
                "message"=>"the favorite was not found!"
            ],404);
        }
    }
    // engineerがどのcompanyにFavoriteを送っているかを知る関数
    public function get_engineer_favorited_company_info(Request $request)
    {
        $validated = $request->validate([
            "engineer_id"=>"required|numeric",
        ]);
        $favorited_companies = Favorite::
            where("engineer_id",$validated["engineer_id"])
            ->where("type","e_to_c")
            ->with("company")
            ->get();
        $favorited_company_infos = [];
        foreach($favorited_companies as $favorited_company){
            array_push($favorited_company_infos,[
                "id"=>$favorited_company->company_id,
                "profile"=>$favorited_company->company_profile,
                "using_stacks"=>$favorited_company->company_using_stacks,
            ]);
        }
        return response()->json([
            "result"=>true,
            "company_infos"=>$favorited_company_infos,
        ]);
    }
    // companyがどのengineerにFavoriteを送っているかを知る関数
    public function get_company_favorited_engineer_info(Request $request)
    {
        $validated = $request->validate([
            "company_id"=>"required|numeric",
        ]);
        $favorited_engineers = Favorite::
            where("company_id",$validated["company_id"])
            ->where("type","c_to_e")
            ->with("engineer")
            ->get();
        $favorited_engineer_infos = [];
        foreach($favorited_engineers as $favorited_engineer){
            array_push($favorited_engineer_infos,[
                "id"=>$favorited_engineer->engineer_id,
                "profile"=>$favorited_engineer->engineer_profile,
                "using_stacks"=>$favorited_engineer->engineer_good_ats,
                "want_to_work_ats"=>$favorited_engineer->engineer_want_work_ats,
            ]);
        }
        return response()->json([
            "result"=>true,
            "engineer_infos"=>$favorited_engineer_infos,
        ]);
    }
    // engineerアカウントがどのcomapnyアカウントからFavoriteを受け取っているかを知る関数
    public function get_engineer_favorited_by_company_info(Request $request)
    {
        $validated = $request->validate([
            "engineer_id"=>"required|numeric",
        ]);
        $favorited_companies = Favorite::
            where("engineer_id",$validated["engineer_id"])
            ->where("type","c_to_e")
            ->with("company")
            ->get();
        $favorited_company_infos = [];
        foreach($favorited_companies as $favorited_company){
            array_push($favorited_company_infos,[
                "id"=>$favorited_company->company_id,
                "profile"=>$favorited_company->company_profile,
                "using_stacks"=>$favorited_company->company_using_stacks,
            ]);
        }
        return response()->json([
            "result"=>true,
            "company_infos"=>$favorited_company_infos,
        ]);
    }
    // companyアカウントがどのengineerアカウントからFavoriteを受け取っているかを知る関数
    public function get_company_favorited_by_engineer_info(Request $request)    
    {
        $validated = $request->validate([
            "company_id"=>"required|numeric",
        ]);
        $favorited_engineers = Favorite::
            where("company_id",$validated["company_id"])
            ->where("type","e_to_c")
            ->with("engineer")
            ->get();
        $favorited_engineer_infos = [];
        foreach($favorited_engineers as $favorited_engineer){
            array_push($favorited_engineer_infos,[
                "id"=>$favorited_engineer->engineer_id,
                "profile"=>$favorited_engineer->engineer_profile,
                "using_stacks"=>$favorited_engineer->engineer_good_ats,
                "want_to_work_ats"=>$favorited_engineer->engineer_want_work_ats,
            ]);
        }
        return response()->json([
            "result"=>true,
            "engineer_infos"=>$favorited_engineer_infos,
        ]);
    }
}
