<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'address',
        'homepageURL',
        'password',
    ];
    protected $hidden = [
        'password',
    ];

    public function company_tokens()
    {
        return $this->hasMany(Company_Token::class);
    }
}
