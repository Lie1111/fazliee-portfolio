<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profile::query()->updateOrCreate(
            ['email' => 'fazliee98@gmail.com'],
            [
                'name' => 'Muhammad Fazliee Aiman',
                'brand_name' => 'Fazliee Aiman',
                'headline' => 'I turn ideas into apps, maps & websites.',
                'intro' => "Hi, I'm Fazliee, a Creative IT graduate from UiTM. I design and develop mobile apps, interactive 360° experiences and websites.",
                'about_story' => 'Creative IT graduate from UiTM Shah Alam, merging creativity with technical skill to build innovative, user-friendly solutions.',
                'phone' => '+60 13-733 7271',
                'location' => 'Subang Jaya, Selangor, MY',
                'availability' => 'Available for work',
                'linkedin' => 'https://www.linkedin.com/in/fazliee-aiman',
                'github' => null,
                'resume_url' => null,
            ],
        );
    }
}
