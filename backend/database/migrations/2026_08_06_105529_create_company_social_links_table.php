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
        Schema::create('company_social_links', function (Blueprint $table) {
            $table->id();

            // Relation with companies table
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();

            $table->string('platform', 50);  // e.g., 'linkedin', 'twitter', 'facebook', 'github'
            $table->string('icon', 50)->nullable();
            $table->string('url');

            $table->timestamps();

            // Compound Unique Index: Single company cannot have duplicate entries for the same platform
            $table->unique(['company_id', 'platform']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_social_links');
    }
};
