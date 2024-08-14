<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EngineerToken extends Model
{
    use HasFactory;
    protected $fillable = ['engineer_id','token'];
    public function engineers()
    {
        $this->belongsTo(Engineer::class);
    }
}
