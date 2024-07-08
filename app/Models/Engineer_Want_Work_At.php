<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Engineer_Want_Work_At extends Model
{
    use HasFactory;
    protected $fillable = ['engineer_id','place'];
    public function engineers()
    {
        return $this->belongsTo(Engineer::class);
    }
}
