<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Engineer extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
    protected $hidden = [
        'password',
    ];

    public function engineer_tokens()
    {
        return $this->hasMany(Engineer_Token::class);
    }
    public function portfolios()
    {
        return $this->hasMany(Portfolio::class);
    }
    public function engineer_want_work_at()
    {
        return $this->hasMany(Engineer_Want_Work_At::class);
    }
    public function engineer_good_at()
    {
        return $this->hasMany(Engineer_Good_At::class);
    }
    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
