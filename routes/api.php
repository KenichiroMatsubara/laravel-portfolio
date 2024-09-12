<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
$test = "App\Http\Controllers\TestController@";
$engineer = "App\Http\Controllers\EngineerController@";
$company = "App\Http\Controllers\CompanyController@";
$chat = "App\Http\Controllers\ChatController@";
$favorite = "App\Http\Controllers\FavoriteController@";
$portfolio = "App\Http\Controllers\PortfolioController@";

Route::get("/",$test."test");
Route::post("/req_test",$test."req_test");

Route::post("/create_engineer_account",$engineer."create_engineer_account");
Route::post("/signin_engineer_account_by_password",$engineer."signin_engineer_account_by_password");
Route::post("/signin_engineer_account_by_token",$engineer."signin_engineer_account_by_token");
Route::post("/get_engineer_info",$engineer."get_engineer_info");
Route::post("/update_engineer_account",$engineer."update_engineer_account");
Route::post("/destroy_engineer_account",$engineer."destroy_engineer_account");
Route::post("/search_engineers", $engineer."search_engineers");


Route::post("/create_company_account",$company."create_company_account");
Route::post("/signin_company_account_by_password",$company."signin_company_account_by_password");
Route::post("/signin_company_account_by_token",$company."signin_company_account_by_token");
Route::post("/get_company_info",$company."get_company_info");
Route::post("/update_company_account",$company."update_company_account");
Route::post("/destroy_company_account",$company."destroy_company_account");
Route::post("/search_companies", $company."search_companies");


Route::post("/create_chat",$chat."create_chat");
Route::post("/update_chat",$chat."update_chat");
Route::post("/destroy_chat",$chat."destry_chat");
Route::post("/get_company_id_by_engineer_id",$chat."get_company_id_by_engineer_id");
Route::post("/get_engineer_id_by_company_id",$chat."get_engineer_id_by_company_id");
Route::post("/get_chat",$chat."get_chat");

Route::post("/create_favorite",$favorite."create_favorite");
Route::post("/destroy_favorite",$favorite."destroy_favorite");
Route::post("/get_engineer_favorited_company_info",$favorite."get_engineer_favorited_company_info");
Route::post("/get_company_favorited_engineer_info",$favorite."get_company_favorited_engineer_info");
Route::post("/get_engineer_favorited_by_company_info",$favorite."get_engineer_favorited_by_company_info");
Route::post("/get_company_favorited_by_engineer_info",$favorite."get_company_favorited_by_engineer_info");



Route::post("/get_portfolio_info",$portfolio."get_portfolio_info");
Route::post("/get_portfolio_ids",$portfolio."get_portfolio_ids");
Route::post("/create_portfolio",$portfolio."create_portfolio");
Route::post("/update_portfolio",$portfolio."update_portfolio");
Route::post("/destroy_portfolio",$portfolio."destroy_portfolio");
