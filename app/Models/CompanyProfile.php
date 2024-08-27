<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    use HasFactory;
    protected $fillable = [
        "company_id",
        "name",
        "address",
        "explain",
        "imgURL",
        "homepageURL",
    ];
    public function company()
    {
        return $this->hasOne(Company::class);
    }
}
