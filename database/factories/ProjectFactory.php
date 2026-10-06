<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->catchPhrase();

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'category' => fake()->randomElement(['Mobile', 'Web', '3D & Unity', 'Community']),
            'client' => fake()->company(),
            'year' => (string) fake()->year(),
            'role' => fake()->jobTitle(),
            'tools' => fake()->randomElements(['Flutter', 'Dart', 'C#', 'Unity', 'PHP', 'MariaDB'], 3),
            'summary' => fake()->paragraph(),
            'challenge' => fake()->paragraph(),
            'process' => fake()->paragraph(),
            'solution' => fake()->paragraph(),
            'results' => [
                ['label' => 'Users', 'value' => (string) fake()->numberBetween(100, 5000)],
            ],
            'thumbnail' => null,
            'hero_media' => null,
            'demo_url' => null,
            'badge' => null,
            'featured' => false,
            'sort_order' => 0,
        ];
    }

    /**
     * Indicate that the project is featured on the home page.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
        ]);
    }
}
