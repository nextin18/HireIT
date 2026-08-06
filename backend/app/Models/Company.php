<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $guarded = [];

    // Company Belongs to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Company Has Many Locations
    public function locations()
    {
        return $this->hasMany(CompanyLocation::class);
    }

    // Company Has Many Social Links
    public function SocialLinks()
    {
        return $this->hasMany(CompanySocialLink::class);
    }
}
