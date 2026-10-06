<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Muhammad Fazliee Aiman',
            'brand_name' => 'Fazliee Aiman',
            'headline' => 'I TURN IDEAS INTO APPS, MAPS & WEBSITES.',
            'intro' => "Hi, I'm Fazliee, a Creative IT graduate from UiTM. I design and develop mobile apps, interactive 360° experiences and websites.",
            'about_story' => 'Creative IT graduate from UiTM Shah Alam, merging creativity with technical skill to build innovative, user-friendly solutions.',
            'email' => 'fazliee98@gmail.com',
            'phone' => '+60 13-733 7271',
            'location' => 'Subang Jaya, Selangor, MY',
            'availability' => 'Available for work',
            'linkedin' => 'https://www.linkedin.com/in/fazliee-aiman',
            'github' => null,
            'resume_url' => null,
        ];
    }
}
