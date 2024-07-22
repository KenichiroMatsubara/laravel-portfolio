<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;
    protected $fillable = ["engineer_id","explain","githubURL","deployURL"];
    public function engineers()
    {
        return $this->belongsTo(Engineer::class);
    }
    public function portfolio_using_stacks()
    {
        return $this->hasMany(Portfolio_Using_Stack::class);
    }
}
