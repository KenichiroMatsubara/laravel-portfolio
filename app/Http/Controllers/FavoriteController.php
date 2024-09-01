<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyProfile;
use App\Models\CompanyUsingStack;
use App\Models\Engineer;
use App\Models\EngineerGoodAt;
use App\Models\EngineerProfile;
use App\Models\EngineerWantWorkAt;
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
            ->get();
        if($favorite && count($favorite)>0){
            $favorite->each->delete();
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
            ->get();
        if($favorite && count($favorite)>0){
            $favorite->each->delete();
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
        $favorited_company_profiles = Favorite::
            where("engineer_id",$validated["engineer_id"])
            ->where("type","e_to_c")
            ->get();
        $favorited_company_infos = [];
        foreach($favorited_company_profiles as $favorited_company_profile){
            $favorite = Favorite::where("company_id",$favorited_company_profile->company_id)
            ->where("engineer_id",$validated["engineer_id"])
            ->where("type","c_to_e")
            ->first();
            // favoriteが存在するならば、is_favoritedをtrueにする
            $is_favorited = false;
            if($favorite){
                $is_favorited=true;
            }
            array_push($favorited_company_infos,[
                "id"=>$favorited_company_profile->company_id,
                "profile">=$favorited_company_profile,
                "using_stacks"=>$favorited_company_profile->company->company_using_stacks,
                "company_favorited"=>$is_favorited
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
        $favorited_engineer_profiles = Favorite::
            where("company_id",$validated["company_id"])
            ->where("type","c_to_e")
            ->with("engineer")
            ->get();
        $favorited_engineer_infos = [];
        foreach($favorited_engineer_profiles as $favorited_engineer_profile){
            $favorite = Favorite::where("engineer_id",$favorited_engineer_profile->engineer_id)
            ->where("company_id",$validated["company_id"])
            ->where("type","e_to_c")
            ->first();
            // favoriteが存在するならば、is_favoritedをtrueにする
            $is_favorited = false;
            if($favorite){
                $is_favorited=true;
            }
            array_push($favorited_engineer_infos,[
                "id"=>$favorited_engineer_profile->engineer_id,
                "profile"=>$favorited_engineer_profile,
                "using_stacks"=>$favorited_engineer_profile->engineer->engineer_good_ats,
                "want_work_ats"=>$favorited_engineer_profile->engineer->engineer_want_work_ats,
                "engineer_favorited"=> $is_favorited
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
        $favorited_company_profiles = Favorite::
            where("engineer_id",$validated["engineer_id"])
            ->where("type","c_to_e")
            ->with("company")
            ->get();
        $favorited_company_infos = [];
        foreach($favorited_company_profiles as $favorited_company_profile){
            $favorite = Favorite::where("company_id",$favorited_company_profile->company_id)
                ->where("engineer_id",$validated["engineer_id"])
                ->where("type","e_to_c")
                ->first();
            // favoriteが存在するならば、is_favoritedをtrueにする
            $is_favorited = false;
            if($favorite){
                $is_favorited=true;
            }
            array_push($favorited_company_infos,[
                "id"=>$favorited_company_profile->company_id,
                "profile">=$favorited_company_profile,
                "using_stacks"=>$favorited_company_profile->company->company_using_stacks,
                "engineer_favorited"=>$is_favorited,
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
        $favorited_engineer_profiles = Favorite::
            where("company_id",$validated["company_id"])
            ->where("type","e_to_c")
            ->with("engineer")
            ->get();
        $favorited_engineer_infos = [];
        foreach($favorited_engineer_profiles as $favorited_engineer_profile){
            $favorite = Favorite::where("engineer_id",$favorited_engineer_profile->engineer_id)
            ->where("company_id",$validated["company_id"])
            ->where("type","c_to_e")
            ->first();
            // favoriteが存在するならば、is_favoritedをtrueにする
            $is_favorited = false;
            if($favorite){
                $is_favorited=true;
            }
            array_push($favorited_engineer_infos,[
                "id"=>$favorited_engineer_profile->engineer_id,
                "profile"=>$favorited_engineer_profile,
                "using_stacks"=>$favorited_engineer_profile->engineer->engineer_good_ats,
                "want_work_ats"=>$favorited_engineer_profile->engineer->engineer_want_work_ats,
                "company_favorited"=>$is_favorited
            ]);
        }
        return response()->json([
            "result"=>true,
            "engineer_infos"=>$favorited_engineer_infos,
        ]);
    }
    public function is_company_favorited(Request $request){
        $validated = $request->validate([
            "engineer_ids" => "required|array",
            "engineer_ids.*"=>"required|numeric",
            "company_id"=>"required|numeric",
        ]);
        $is_favoriteds = [];
        foreach($validated["engineer_ids"] as $engineer_id){
            $favorite = Favorite::where("engineer_id",$engineer_id)
                ->where("company_id",$validated["company_id"])
                ->where("type","c_to_e")
                ->first();
            // $favoriteが存在するならば
            if($favorite){
                $is_favoriteds[] = true;
            }
            else {
                $is_favoriteds[] = false;
            }
        }
        return response()->json([
            "result" => true,
            "is_favoriteds"=> $is_favoriteds
        ]);
    }
    public function is_engineer_favorited(Request $request){
        $validated = $request->validate([
            "company_ids" => "required|array",
            "company_ids.*"=>"required|numeric",
            "engineer_id"=>"required|numeric",
        ]);
        $is_favoriteds = [];
        foreach($validated["company_ids"] as $company_id){
            $favorite = Favorite::where("engineer_id",$validated["engineer_id"])
            ->where("company_id",$company_id)
            ->where("type","e_to_c")
            ->first();
            // $favoriteが存在するならば
            if($favorite){
                $is_favoriteds[] = true;
            }
            else {
                $is_favoriteds[] = false;
            }
        }
        return response()->json([
            "result" => true,
            "is_favoriteds"=> $is_favoriteds
        ]);
    }
}
