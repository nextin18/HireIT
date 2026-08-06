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
        Schema::create('candidate_experiences', function (Blueprint $table) {
            $table->id();

            $table
                ->foreignId('candidate_id')
                ->constrained('candidate_profiles')
                ->cascadeOnDelete();

            $table->string('company_name');
            $table->string('designation');
            $table->string('job_location')->nullable();

            $table->enum('job_type', [
                'Full-time',
                'Part-time',
                'Contract',
                'Temporary',
                'Internship',
                'Freelance',
                'Externship',
                'Volunteer',
                'Other'
            ])->nullable();

            $table->enum('work_mode', [
                'On-site',
                'Remote',
                'Hybrid'
            ])->default('On-site');

            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_current')->default(false);

            $table->text('description')->nullable();

            $table->text('skills_used')->nullable();

            $table->boolean('is_paid')->default(true);

            $table->decimal('salary', 12, 2)->nullable();

            $table->enum('salary_period', [
                'Hourly',
                'Daily',
                'Weekly',
                'Monthly',
                'Yearly'
            ])->nullable();

            $table->timestamps();

            $table->index('is_current');
            $table->index('job_type');
            $table->index('work_mode');

            $table->unique(['candidate_id', 'company_name', 'designation', 'start_date'], 'unique_candidate_job_entry');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate_experiences');
    }
};
