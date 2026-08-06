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
        Schema::create('company_locations', function (Blueprint $table) {
            $table->id();

            // Relation with companies table
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();

            $table->string('office_name', 100)->nullable();  // e.g., 'Headquarters', 'Branch Office'
            $table->string('address_line1');
            $table->string('address_line2')->nullable();

            $table->string('city', 100);
            $table->string('state', 100)->nullable();
            $table->string('country', 100);
            $table->string('postal_code', 20)->nullable();

            // Coordinates for Maps / Location Filters
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();

            $table->boolean('is_headquarters')->default(false);

            $table->timestamps();

            // Indexes
            $table->index('company_id');
            $table->index('city');
            $table->index('country');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_locations');
    }
};
