<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $fillable = ["engineer_id","company_id","type","text"];
    public function engineers()
    {
        return $this->belongsTo(Engineer::class);
    }
    public function companies()
    {
        return $this->belongsTo(Company::class);
    }
}
