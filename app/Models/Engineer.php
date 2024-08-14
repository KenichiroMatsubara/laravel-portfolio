<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Engineer extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'password',
    ];
    protected $hidden = [
        'password',
    ];

    public function engineer_tokens()
    {
        return $this->hasMany(EngineerToken::class);
    }
    public function portfolios()
    {
        return $this->hasMany(Portfolio::class);
    }
    public function engineer_want_work_at()
    {
        return $this->hasMany(EngineerWantWorkAt::class);
    }
    public function engineer_good_at()
    {
        return $this->hasMany(EngineerGoodAt::class);
    }
    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
