<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'TroCS — 360° Interactive Map',
                'category' => '3D & Unity',
                'client' => 'UiTM KPPIM',
                'year' => '2024',
                'role' => 'Developer',
                'tools' => ['C#', 'Unity', 'Android'],
                'summary' => 'A 360° interactive navigation app of the IT building for the College of Computing, Informatics & Mathematics (KPPIM), UiTM — built as my Final Year Project.',
                'challenge' => 'New students and visitors struggled to find their way around the KPPIM IT building, relying on static floor plans that were hard to read.',
                'process' => 'I captured 360° panoramas of the building, stitched them into a navigable map, and wired up hotspots and pathfinding in Unity with C#.',
                'solution' => 'A mobile app that lets users explore every corner of the building in 360°, tap hotspots for room info, and navigate between floors with an interactive mini-map.',
                'results' => [
                    ['label' => 'Panoramas', 'value' => '20+'],
                    ['label' => 'Floors Mapped', 'value' => '4'],
                    ['label' => 'Final Year Project', 'value' => 'A'],
                ],
                'badge' => 'Final Year Project',
                'featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Tropo — 360° Interactive Map App',
                'category' => '3D & Unity',
                'client' => 'UiTM',
                'year' => '2023',
                'role' => 'Developer',
                'tools' => ['C#', 'Unity', 'Android'],
                'summary' => 'An earlier 360° interactive map mobile application that earned a TOP 10 spot in an app presentation — the foundation that led to TroCS.',
                'challenge' => 'Prove that a 360° panorama approach could power smooth, usable in-app navigation on everyday Android devices.',
                'process' => 'Prototyped panorama capture, hotspot authoring and movement controls, then optimised rendering for mobile performance.',
                'solution' => 'A lightweight app delivering interactive 360° navigation with an intuitive control scheme.',
                'results' => [
                    ['label' => 'Presentation Ranking', 'value' => 'TOP 10'],
                ],
                'badge' => 'TOP 10 App Presentation',
                'featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'MyWau — Buy4Me Service Page',
                'category' => 'Web',
                'client' => 'Mind Trade Sdn. Bhd.',
                'year' => '2024',
                'role' => 'IT Programmer Intern',
                'tools' => ['PHP', 'MariaDB', 'HTML', 'CSS', 'Flutter'],
                'summary' => 'A new Buy4Me service page for the MyWau app during my internship at Mind Trade, plus front-end development work in Flutter.',
                'challenge' => 'The MyWau app needed a clear, trustworthy service page to explain its Buy4Me offering and drive sign-ups.',
                'process' => 'Worked with the team to design the page, built the back-end with PHP and MariaDB, and handled front-end screens in Flutter.',
                'solution' => 'A responsive service page connected to a MariaDB back-end, with supporting Flutter front-end flows.',
                'results' => [
                    ['label' => 'Role', 'value' => 'Intern → Contributor'],
                    ['label' => 'Stack', 'value' => 'PHP + Flutter'],
                ],
                'badge' => null,
                'featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'SULAM KPPIM Community Service',
                'category' => 'Community',
                'client' => 'UiTM KPPIM',
                'year' => '2023',
                'role' => 'Volunteer',
                'tools' => ['Community', 'Digital Literacy'],
                'summary' => 'A community service program using modern communication technology to bridge the digital divide and benefit the local community.',
                'challenge' => 'Many community members lacked access and confidence with everyday digital tools.',
                'process' => 'Planned hands-on sessions and used accessible communication technology to teach practical digital skills.',
                'solution' => 'A service program that connected UiTM students with the community and improved digital confidence.',
                'results' => [
                    ['label' => 'Focus', 'value' => 'Digital Divide'],
                ],
                'badge' => 'Community Service',
                'featured' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($projects as $project) {
            Project::query()->updateOrCreate(
                ['slug' => Str::slug($project['title'])],
                $project,
            );
        }
    }
}
