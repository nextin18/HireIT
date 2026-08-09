<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidate_skills', function (Blueprint $table) {
            $table->id();

            // Foreign Keys linking Candidate Profile and Master Skill
            $table->foreignId('candidate_id')->constrained('candidate_profiles')->cascadeOnDelete();
            $table->foreignId('skill_id')->constrained('skills')->cascadeOnDelete();

            // Extra pivot field
            $table->integer('experience_years')->nullable();

            $table->timestamps();

            // Avoid adding the same skill twice to same candidate
            $table->unique(['candidate_id', 'skill_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate_skills');
    }
};
