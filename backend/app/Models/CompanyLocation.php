<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class CompanyLocation extends Model
{
    protected $guarded = [];

    protected $table = 'company_locations';

    protected $casts = [
        'is_headquarters' => 'boolean',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
