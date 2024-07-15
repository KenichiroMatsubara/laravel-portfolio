<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PortfolioController extends Controller
{
    public function get_portfolio_info(Request $request)
    {
        $validated = $request->validated([
            "id" => "required",
        ]);

        $portfolio = Portfolio::find($validated['id']);
        $portfolio_using_stack = $portfolio->portfolio_use_stacks();
        return response()->json([
            "portfolio" => $portfolio,
            "portfolio_using_stacks" => $portfolio_using_stack,
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
    }
}
