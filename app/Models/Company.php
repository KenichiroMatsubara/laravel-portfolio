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
        'explain',
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
    public function favorite_from_companies()
    {
        return $this->hasMany(Favorite_From_Company::class);
    }
    public function company_using_stacks()
    {
        return $this->hasMany(Company_Using_Stack::class);
    }
    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
