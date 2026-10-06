<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            // Technical
            ['name' => 'Dart', 'category' => 'Technical'],
            ['name' => 'C#', 'category' => 'Technical'],
            ['name' => 'Java', 'category' => 'Technical'],
            ['name' => 'JavaScript', 'category' => 'Technical'],
            ['name' => 'HTML/CSS', 'category' => 'Technical'],
            ['name' => 'PHP', 'category' => 'Technical'],
            ['name' => 'SQL', 'category' => 'Technical'],
            ['name' => 'MariaDB', 'category' => 'Technical'],

            // Tools
            ['name' => 'VS Code', 'category' => 'Tools'],
            ['name' => 'Android Studio', 'category' => 'Tools'],
            ['name' => 'GitHub', 'category' => 'Tools'],
            ['name' => 'Bootstrap', 'category' => 'Tools'],
            ['name' => 'WordPress', 'category' => 'Tools'],
            ['name' => 'Unity', 'category' => 'Tools'],

            // Languages
            ['name' => 'Bahasa Melayu (Native)', 'category' => 'Languages'],
            ['name' => 'English (Professional)', 'category' => 'Languages'],
        ];

        foreach ($skills as $index => $skill) {
            Skill::query()->updateOrCreate(
                ['name' => $skill['name']],
                [...$skill, 'sort_order' => $index + 1],
            );
        }
    }
}
