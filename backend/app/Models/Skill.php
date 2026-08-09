<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function candidates()
    {
        return $this->belongsToMany(
            CandidateProfile::class,
            'candidate_skills',
            'skill_id',
            'candidate_id'
        )
        ->withPivot('experience_years')
        ->withTimestamps();
    }
}
