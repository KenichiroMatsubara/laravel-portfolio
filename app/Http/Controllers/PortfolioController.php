<?php

namespace App\Http\Controllers;

use App\Models\Engineer;
use App\Models\Portfolio;
use App\Models\Portfolio_Using_Stack;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PortfolioController extends Controller
{
    public function get_portfolio_info(Request $request)
    {
        $validated = $request->validate([
            "portfolio_id" => "required|numeric",
        ]);
        $portfolio = Portfolio::find($validated["portfolio_id"]);
        $stacks = Portfolio_Using_Stack::where("portfolio_id",$portfolio->id)->get();

        return response()->json([
            "portfolio" => $portfolio,
            "stacks" => $stacks,
        ]);
    }
    public function get_portfolio_ids(Request $request)
    {
        $validated = $request->validate([
            "engineer_id" => "required|numeric",
        ]);

        $portfolios = Portfolio::where("engineer_id",$validated["engineer_id"])->get();
        $all_portfolios = Portfolio::get();
        $portfolio_ids = [];
        foreach($portfolios as $portfolio){
            $portfolio_ids[] = $portfolio->id;
        }
        return response()->json([
            "product_ids" => $portfolio_ids,
        ]);
    }
    public function create_portfolio(Request $request)
    {
        $validated = $request->validate([
            "name"=>"required",
            "engineer_id"=>"required|numeric",
            "explain"=>"required",
            "githubURL"=>"required",
            "deployURL"=>"required",
            "using_stacks"=>"required|array",
            "using_stacks.*"=> "required|string"
        ]);
        $new_portfolio = Portfolio::create([
            "name" => $validated["name"],
            "engineer_id"=>$validated["engineer_id"],
            "explain"=>$validated["explain"],
            "githubURL"=>$validated["githubURL"],
            "deployURL"=>$validated["deployURL"],
        ]);
        foreach($validated["using_stacks"] as $using_stack){
            $new_using_stack = Portfolio_Using_Stack::create([
                "portfolio_id"=>$new_portfolio->id,
                "stack"=>$using_stack,
            ]);
        }
        $new_using_stacks = Portfolio_Using_Stack::where("portfolio_id",$new_portfolio->id)->get();
        return response()->json([
            "result" => true,
            "new portfolio" => $new_portfolio,
            "new using stacks" => $new_using_stacks,
        ]);
    }
    public function update_portfolio(Request $request)
    {
        $validated = $request->validate([
            "portfolio_id"=>"required|numeric",
            "name" => "required",
            "engineer_id"=>"required|numeric",
            "explain"=>"nullable",
            "githubURL"=>"nullable",
            "deployURL"=>"nullable",
            "using_stacks"=>"required|array",
        ]);
        $updated_portfolio = Portfolio::find($validated["portfolio_id"]);
        $updated_portfolio->update([
            "name"=>$validated["name"],
            "engineer_id"=>$validated["engineer_id"],
            "explain"=>$validated["explain"],
            "githubURL"=>$validated["githubURL"],
            "deployURL"=>$validated["deployURL"],
        ]);
        $destroyed_stacks = Portfolio_Using_Stack::where("portfolio_id",$validated["portfolio_id"])->get();
        foreach($destroyed_stacks as $destroyed_stack){
            $destroyed_stack->delete();
        }
        foreach($validated["using_stacks"] as $using_stack){
            $updated_using_stack = Portfolio_Using_Stack::create([
                "portfolio_id"=>$updated_portfolio->id,
                "stack"=>$using_stack,
            ]);
        }
        $updated_using_stacks = Portfolio_Using_Stack::where("portfolio_id",$validated["portfolio_id"])->get();
        return response()->json([
            "result" => true,
            "updated_portfolio" => $updated_portfolio,
            "updated_using_stacks" => $updated_using_stacks,
        ]);

    }
    public function destroy_portfolio(Request $request)
    {
        $validated = $request->validate([
            "id"=>"required|numeric",
        ]);
        $destroyed_portfolio = Portfolio::find($validated["id"]);
        $destroyed_using_stacks = Portfolio_Using_Stack::where("portfolio_id",$validated["id"])->get();
        foreach($destroyed_using_stacks as $destroyed_using_stack){
            $destroyed_using_stack->delete();
        }
        $destroyed_portfolio->delete();
        return response()->json([
            "result"=>"successfully destroyed!",
            "portfolio" => $destroyed_portfolio,
            "using_stacks" => $destroyed_using_stacks,
        ]);
    }
}
