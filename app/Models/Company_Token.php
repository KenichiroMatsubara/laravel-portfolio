<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company_Token extends Model
{
    use HasFactory;

    protected $fillable = ['company_id','token'];
    public function companies()
    {
        $this->belongsTo(Company::class);
    }
}
