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
    public function company_using_stacks()
    {
        return $this->hasMany(CompanyUsingStack::class);
    }
    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
