<?php

namespace App\Http\Controllers;

use App\Models\Engineer;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function test()
    {
        $engineer = Engineer::all();
        return response()->json([
            "engineer"=>$engineer,
            "result"=>"test success!!"
        ]);
    }
    public function req_test(Request $request)
    {
        $validated = $request->validate([
            "name"=>"required",
            "email"=>"required",
            "password"=>"required",
        ]);
        return response()->json([
            "name"=>$validated["name"],
            "email"=>$validated["email"],
            "password"=>$validated["password"],
        ]);
    }
}
