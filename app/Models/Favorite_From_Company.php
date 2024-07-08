<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite_From_Company extends Model
{
    use HasFactory;
    protected $fillable = ["company_id","engineer_id"];
    public function companies()
    {
        return $this->belongsTo(Company::class);
    }
    public function engineers()
    {
        return $this->belongsTo(Engineer::class);
    }
}
