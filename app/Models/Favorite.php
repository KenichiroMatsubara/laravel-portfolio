<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        "company_id",
        "engineer_id",
        "type"
    ];

    public function engineer()
    {
        return $this->belongsTo(Engineer::class);
    }
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
