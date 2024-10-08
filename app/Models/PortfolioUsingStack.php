<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioUsingStack extends Model
{
    use HasFactory;
    protected $fillable = ["portfolio_id","stack"];
    public function portfolios()
    {
        return $this->belongsTo(Portfolio::class);
    }
}
