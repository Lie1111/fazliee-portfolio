<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Fazliee',
            'email' => 'fazliee98@gmail.com',
            'password' => 'abcd1234',
        ]);

        $this->call([
            ProfileSeeder::class,
            ProjectSeeder::class,
            ServiceSeeder::class,
            SkillSeeder::class,
            TimelineEntrySeeder::class,
        ]);
    }
}
