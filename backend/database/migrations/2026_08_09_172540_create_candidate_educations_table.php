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
        Schema::create('candidate_educations', function (Blueprint $table) {
            $table->id();

            $table
                ->foreignId('candidate_id')
                ->constrained('candidate_profiles')
                ->cascadeOnDelete();

            // Education Details
            $table->enum('education_level', [
                '10th',
                '12th',
                'Diploma',
                'Bachelor',
                'Master',
                'PhD',
                'Other'
            ]);

            $table->string('institution_name');
            $table->string('degree');
            $table->string('field_of_study')->nullable();

            // Location & Mode
            $table->string('institution_location')->nullable();

            $table->enum('study_mode', [
                'Full-time',
                'Part-time',
                'Online',
                'Distance'
            ])->nullable();

            // Duration
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_current')->default(false);

            // Academic Performance
            $table->string('grade_or_score', 50)->nullable();

            $table->enum('grade_type', [
                'CGPA',
                'Percentage',
                'GPA',
                'Grade',
                'Other'
            ])->nullable();

            // Additional Information
            $table->text('description')->nullable();
            $table->text('achievements')->nullable();

            $table->timestamps();

            $table->index('education_level');
            $table->index('candidate_id');

            $table->unique(['candidate_id', 'institution_name', 'degree', 'start_date'], 'unique_candidate_education_entry');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate_educations');
    }
};
