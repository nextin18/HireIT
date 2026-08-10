<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateSkill extends Model
{
    protected $table = 'candidate_skills';
    
    protected $guarded = [];

    public function candidate()
    {
        return $this->belongsTo(CandidateProfile::class, 'candidate_id');
    }

    public function skill()
    {
        return $this->belongsTo(Skill::class, 'skill_id');
    }
}
