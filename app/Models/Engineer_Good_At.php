<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Engineer_Good_At extends Model
{
    use HasFactory;
    protected $fillable = ['engineer_id','stack'];
    public function engineers()
    {
        return $this->belongsTo(Engineer::class);
    }
}
