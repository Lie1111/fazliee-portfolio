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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('client')->nullable();
            $table->string('year')->nullable();
            $table->string('role')->nullable();
            $table->json('tools')->nullable();
            $table->text('summary');
            $table->text('challenge')->nullable();
            $table->text('process')->nullable();
            $table->text('solution')->nullable();
            $table->json('results')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('hero_media')->nullable();
            $table->string('demo_url')->nullable();
            $table->string('badge')->nullable();
            $table->boolean('featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
