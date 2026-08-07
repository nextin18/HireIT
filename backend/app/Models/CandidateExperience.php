<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateExperience extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'is_paid' => 'boolean',
        'salary' => 'decimal:2',
    ];

    public function candidateProfile()
    {
        return $this->belongsTo(CandidateProfile::class, 'candidate_id');
    }
}
