<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidate_profiles', function (Blueprint $table) {
            $table->id();

            // One-to-One relation with users table
            $table->foreignId('user_id')->unique()->constrained('users')->onDelete('cascade');

            $table->string('headline')->nullable();
            $table->string('website')->nullable();
            $table->string('resume_path')->nullable();
            $table->string('experience_years')->default('Fresher');
            $table->decimal('current_salary', 12, 2)->default(0.0);
            $table->decimal('expected_salary', 12, 2)->default(0.0);
            $table->text('bio')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Indexing for faster queries
            // 1. Fast Filter: Recruiter filters candidates by experience range
            $table->index('experience_years');

            // 2. Fast Filter: Recruiter filters candidates under maximum budget
            $table->index('expected_salary');

            // 3. Fast Filter: Laravel SoftDeletes queries check `deleted_at IS NULL`
            $table->index('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate_profiles');
    }
};
