<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company_Using_Stack extends Model
{
    use HasFactory;
    protected $fillable = ["company_id","stack"];
    public function companies()
    {
        return $this->belongsTo(Company::class);
    }
}
