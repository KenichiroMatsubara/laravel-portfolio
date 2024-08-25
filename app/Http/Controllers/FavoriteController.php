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
            ->get();
        $favorited_company_ids = [];
        foreach($favorited_companies as $favorited_company){
            array_push($favorited_company_ids,$favorited_company->company_id);
        }
        return response()->json([
            "result"=>true,
            "company_ids"=>$favorited_company_ids,
        ]);
    }
    // companyがどのengineerにFavoriteを送っているかを知る関数
    public function get_company_favorited_engineer_info(Request $request)
    {
        $validated = $request->validate([
            "company_id"=>"required|numeric",
        ]);
        $favorites = Company::find($validated["company_id"])
            ->favorites()
            ->where('type','e_to_c')
            ->get();
        $engineers = [];
        foreach($favorites as $favorite){
            array_push($engineers,$favorite->engineer);
        }
        $engineer_info=[];
        foreach($engineers as $engineer){
            array_push($engineer_info,[
                "engineer"=>$engineer,
                "engineer_want_work_at"=>$engineer->engineer_want_work_at,
                "engineer_good_at"=>$engineer->engineer_good_at,
            ]);
        }

        return response()->json([
            "result"=>true,
            "favorites"=>$favorites,
            "engineers"=>$engineers,
            "engineer_info"=>$engineer_info,
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
            ->get();
        $favorited_company_ids = [];
        foreach($favorited_companies as $favorited_company){
            array_push($favorited_company_ids,$favorited_company->company_id);
        }
        return response()->json([
            "result"=>true,
            "company_ids"=>$favorited_company_ids,
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
            ->get();
        $favorited_engineer_ids = [];
        foreach($favorited_engineers as $favorited_engineer){
            array_push($favorited_engineer_ids,$favorited_engineer->engineer_id);
        }
        return response()->json([
            "result"=>true,
            "engineer_ids"=>$favorited_engineer_ids,
        ]);
    }
}
