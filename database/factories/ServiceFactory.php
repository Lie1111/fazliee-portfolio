<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => fake()->numerify('0#'),
            'title' => fake()->catchPhrase(),
            'description' => fake()->paragraph(),
            'icon' => 'sparkles',
            'items' => fake()->randomElements(['Flutter', 'Unity', 'PHP', 'SQL'], 2),
            'sort_order' => 0,
        ];
    }
}
