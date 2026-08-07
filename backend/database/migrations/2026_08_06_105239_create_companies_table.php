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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();

            // One-to-One relation with users table
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();

            $table->string('company_name');
            $table->string('slug')->unique();  // Unique for SEO friendly URLs
            $table->string('tagline')->nullable();
            $table->string('logo')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('website')->nullable();

            $table->string('industry', 100)->nullable();
            $table->string('company_size', 100)->nullable();  // e.g., '1-10', '11-50', '500+'
            $table->string('company_type', 50)->nullable();  // e.g., 'Private', 'Public', 'Startup'

            $table->unsignedSmallInteger('founded_year')->nullable();
            $table->text('about')->nullable();

            $table->boolean('is_verified')->default(false);
            $table->string('registration_number', 100)->nullable();

            // Status: active, pending, suspended
            $table->string('status', 20)->default('active');

            $table->timestamps();

            // Indexes for fast querying
            $table->index('company_name');
            $table->index('industry');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
