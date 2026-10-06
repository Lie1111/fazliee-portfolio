<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'number' => '01',
                'title' => 'Mobile App Development',
                'description' => 'Cross-platform and native mobile apps built to feel fast, familiar and genuinely useful.',
                'icon' => 'smartphone',
                'items' => ['Flutter', 'Dart', 'Android Studio', 'Mobile UI/UX'],
                'sort_order' => 1,
            ],
            [
                'number' => '02',
                'title' => 'Interactive 360° & Unity Experiences',
                'description' => 'Immersive virtual tours and interactive 3D environments that let people explore a space from anywhere.',
                'icon' => 'globe',
                'items' => ['C#', 'Unity', '360° Navigation', 'Virtual Tours'],
                'sort_order' => 2,
            ],
            [
                'number' => '03',
                'title' => 'Web Development',
                'description' => 'Responsive websites and web systems — from marketing pages to database-backed applications.',
                'icon' => 'code',
                'items' => ['HTML/CSS', 'JavaScript', 'PHP', 'Bootstrap', 'WordPress', 'MariaDB/SQL'],
                'sort_order' => 3,
            ],
            [
                'number' => '04',
                'title' => 'Systems & IT Support',
                'description' => 'Keeping the tech behind the scenes reliable — networks, servers, databases and the people who use them.',
                'icon' => 'server',
                'items' => ['Network Setup', 'Routers & Switches', 'Firewalls', 'Troubleshooting', 'Database Admin', 'Systems Analysis'],
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::query()->updateOrCreate(
                ['number' => $service['number']],
                $service,
            );
        }
    }
}
