<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EngineerGoodAt extends Model
{
    use HasFactory;
    protected $fillable = ['engineer_id','stack'];
    public function engineer()
    {
        return $this->belongsTo(Engineer::class);
    }
}
