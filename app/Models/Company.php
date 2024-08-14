<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'password',
    ];
    protected $hidden = [
        'password',
    ];

    public function company_tokens()
    {
        return $this->hasMany(CompanyToken::class);
    }
    public function favorite_from_companies()
    {
        return $this->hasMany(FavoriteFromCompany::class);
    }
    public function company_using_stacks()
    {
        return $this->hasMany(CompanyUsingStack::class);
    }
    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
