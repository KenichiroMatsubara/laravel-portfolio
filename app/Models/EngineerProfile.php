<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EngineerProfile extends Model
{
    use HasFactory;
    protected $fillable = [
        "engineer_id",
        "name",
        "work_experience",
    ];
}
