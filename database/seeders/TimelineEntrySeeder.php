<?php

namespace Database\Seeders;

use App\Models\TimelineEntry;
use Illuminate\Database\Seeder;

class TimelineEntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $entries = [
            // Education
            [
                'type' => TimelineEntry::TypeEducation,
                'title' => 'Bachelor of IT (Hons.) Creative IT',
                'organisation' => 'UiTM Shah Alam',
                'period' => '2021 — 2024',
                'description' => "Dean's List (2 semesters). Merged creativity with technical skill across mobile, 360° and web projects.",
                'sort_order' => 1,
            ],
            [
                'type' => TimelineEntry::TypeEducation,
                'title' => 'Diploma in Digital Technology',
                'organisation' => 'Politeknik Sultan Idris Shah',
                'period' => '2016 — 2018',
                'description' => "Dean's List. Built the foundation in programming, networking and digital systems.",
                'sort_order' => 2,
            ],

            // Experience
            [
                'type' => TimelineEntry::TypeExperience,
                'title' => 'IT Programmer Intern',
                'organisation' => 'Mind Trade Sdn. Bhd.',
                'period' => 'Mar — Jun 2024',
                'description' => 'Built the MyWau Buy4Me service page (PHP, MariaDB, HTML) and contributed Flutter front-end work.',
                'sort_order' => 1,
            ],
            [
                'type' => TimelineEntry::TypeExperience,
                'title' => 'Admin',
                'organisation' => 'Zaan Maju Enterprise',
                'period' => '2021',
                'description' => 'Handled day-to-day administration and supported digital record-keeping.',
                'sort_order' => 2,
            ],
            [
                'type' => TimelineEntry::TypeExperience,
                'title' => 'Part-time IT Support',
                'organisation' => 'Everything CSM Hardware City',
                'period' => '2020',
                'description' => 'Diagnosed and repaired hardware, and assisted customers with technical issues.',
                'sort_order' => 3,
            ],
            [
                'type' => TimelineEntry::TypeExperience,
                'title' => 'IT Support Intern',
                'organisation' => 'Pharmaniaga Logistics',
                'period' => '2019',
                'description' => 'First taste of professional IT — supporting users and keeping systems running.',
                'sort_order' => 4,
            ],

            // Journey (home page horizontal timeline)
            [
                'type' => TimelineEntry::TypeJourney,
                'title' => 'Politeknik',
                'organisation' => 'Politeknik Sultan Idris Shah',
                'period' => '2016',
                'description' => 'Started my journey in digital technology.',
                'sort_order' => 1,
            ],
            [
                'type' => TimelineEntry::TypeJourney,
                'title' => 'First IT Internship',
                'organisation' => 'Pharmaniaga Logistics',
                'period' => '2019',
                'description' => 'First real-world IT support experience.',
                'sort_order' => 2,
            ],
            [
                'type' => TimelineEntry::TypeJourney,
                'title' => 'UiTM Shah Alam',
                'organisation' => 'Bachelor of IT (Hons.) Creative IT',
                'period' => '2021',
                'description' => 'Levelled up with a creative IT degree.',
                'sort_order' => 3,
            ],
            [
                'type' => TimelineEntry::TypeJourney,
                'title' => 'Mind Trade & Graduation',
                'organisation' => 'Mind Trade Sdn. Bhd.',
                'period' => '2024',
                'description' => 'Interned as an IT programmer and graduated.',
                'sort_order' => 4,
            ],
        ];

        foreach ($entries as $entry) {
            TimelineEntry::query()->updateOrCreate(
                [
                    'type' => $entry['type'],
                    'title' => $entry['title'],
                ],
                $entry,
            );
        }
    }
}
