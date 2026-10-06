<?php

namespace Database\Factories;

use App\Models\TimelineEntry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TimelineEntry>
 */
class TimelineEntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => fake()->randomElement(TimelineEntry::Types),
            'title' => fake()->jobTitle(),
            'organisation' => fake()->company(),
            'period' => (string) fake()->year(),
            'description' => fake()->sentence(),
            'sort_order' => 0,
        ];
    }
}
