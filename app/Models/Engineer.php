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
    public function portfolios()
    {
        return $this->hasMany(Portfolio::class);
    }
    public function engineer_want_work_ats()
    {
        return $this->hasMany(EngineerWantWorkAt::class);
    }
    public function engineer_good_ats()
    {
        return $this->hasMany(EngineerGoodAt::class);
    }
    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
    public function engineer_profile()
    {
        return $this->hasOne(EngineerProfile::class);
    }
}
