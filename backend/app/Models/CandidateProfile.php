<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'headline',
        'website',
        'resume_path',
        'experience_years',
        'current_salary',
        'expected_salary',
        'bio',
    ];

    /**
     * Relationship: Profile belongs to User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: Candidate has many Work Experiences
     */
    public function experiences()
    {
        return $this->hasMany(CandidateExperience::class, 'candidate_id');
    }

    /**
     * Relationship: Candidate has many Educations
     */
    // public function educations()
    // {
    //     return $this->hasMany(CandidateEducation::class, 'candidate_id');
    // }

    /**
     * Relationship: Candidate has many Skills (Pivot Table)
     */
    // public function skills()
    // {
    //     return $this
    //         ->belongsToMany(Skill::class, 'candidate_skill', 'candidate_id', 'skill_id')
    //         ->withPivot('experience_years');
    // }

    /**
     * Relationship: Candidate has many Job Applications
     */
    // public function applications()
    // {
    //     return $this->hasMany(JobApplication::class, 'candidate_id');
    // }

    /**
     * Relationship: Saved Jobs (Pivot)
     */
    // public function savedJobs()
    // {
    //     return $this
    //         ->belongsToMany(Job::class, 'saved_jobs', 'candidate_id', 'job_id')
    //         ->withTimestamps();
    // }
}
