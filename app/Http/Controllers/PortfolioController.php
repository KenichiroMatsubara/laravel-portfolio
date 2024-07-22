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
            "engineer_id" => "required|numeric",
        ]);

        $portfolios = Engineer::find($validated["engineer_id"])->portfolios();
        $portfolios_using_stacks = [];
        foreach($portfolios as $portfolio){
            $portfolio_using_stacks = $portfolio->portfolio_using_stacks();
            array_push($portfolios_using_stacks,$portfolio_using_stacks);
        }
        return response()->json([
            "portfolios" => $portfolios,
            "portfolios_using_stacks" => $portfolios_using_stacks,
        ]);
    }
    public function create_portfolio(Request $request)
    {
        $validated = $request->validate([
            "engineer_id"=>"required",
            "explain"=>"required",
            "githubURL"=>"required",
            "deployURL"=>"required",
            "using_stacks"=>"required",
        ]);
        $new_portfolio = Portfolio::create([
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
        $new_using_stacks = $new_portfolio->portfolio_using_stacks();
        return response()->json([
            "new_portfolio"=>$new_portfolio,
            "using_stacks"=>$new_using_stacks,
        ]);
    }
    public function update_potfolio(Request $request)
    {
        $validated = $request->validate([
            "id"=>"required|numeric",
            "engineer_id"=>"required",
            "explain"=>"required",
            "githubURL"=>"required",
            "deployURL"=>"required",
            "using_stacks"=>"required",
        ]);
        $updated_portfolio = Portfolio::find($validated["id"]);
        $updated_portfolio->update([
            "engineer_id"=>$validated["engineer_id"],
            "explain"=>$validated["explain"],
            "githubURL"=>$validated["githubURL"],
            "deployURL"=>$validated["deployURL"],
        ]);
        $destroyed_stacks = $updated_portfolio->portfolio_using_stacks();
        foreach($destroyed_stacks as $destroyed_stack){
            $destroyed_stack->delete();
        }
        foreach($validated["using_stacks"] as $using_stack){
            $updated_using_stack = Portfolio_Using_Stack::create([
                "portfolio_id"=>$updated_portfolio->id,
                "stack"=>$using_stack,
            ]);
        }
        $updated_using_stacks = $updated_portfolio->portfolio_using_stacks();
        return response()->json([
            "updated_portfolio"=>$updated_portfolio,
            "using_stacks"=>$updated_using_stacks,
        ]);
    }
    public function destroy_portfolio(Request $request)
    {
        $validated = $request->validate([
            "id"=>"required|numeric",
        ]);
        $destroyed_portfolio = Portfolio::find($validated["id"]);
        $destroyed_using_stacks = $destroyed_portfolio->portfolio_using_stacks();
        foreach($destroyed_using_stacks as $destroyed_using_stack){
            $destroyed_using_stack->delete();
        }
        $destroyed_portfolio->delete();
        return response()->json([
            "result"=>"successfully destroyed!",
        ]);
    }
}
