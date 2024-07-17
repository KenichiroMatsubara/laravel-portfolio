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
$a = "App\Http\Controllers";

Route::get("/",$a."\TestController@test");

Route::post("/create_engineer_account",$a."\EngineerController@create_engineer_account");
Route::post("/signin_engineer_account_by_password",$a."\EngineerController@signin_engineer_account_by_password");
Route::post("/create_engineer_account",$a."\EngineerController@signin_engineer_account_by_token");
Route::post("/create_engineer_account",$a."\EngineerController@get_engineer_info");
Route::post("/create_engineer_account",$a."\EngineerController@update_engineer_account");
Route::post("/create_engineer_account",$a."\EngineerController@destroy_engineer_account");

Route::post("/create_engineer_account",$a."\EngineerController@");



