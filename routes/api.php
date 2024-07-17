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

Route::get("/",$test."test");
Route::post("/req_test",$test."req_test");

Route::post("/create_engineer_account",$engineer."create_engineer_account");
Route::post("/signin_engineer_account_by_password",$engineer."signin_engineer_account_by_password");
// Route::post("/create_engineer_account",$engineer."signin_engineer_account_by_token");
// Route::post("/create_engineer_account",$engineer."get_engineer_info");
// Route::post("/create_engineer_account",$engineer."update_engineer_account");
// Route::post("/create_engineer_account",$engineer."destroy_engineer_account");




