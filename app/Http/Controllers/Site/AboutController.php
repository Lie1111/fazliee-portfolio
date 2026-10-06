<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\TimelineEntry;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Show the public about page.
     */
    public function index(): Response
    {
        return Inertia::render('public/about', [
            'profile' => Profile::current(),
            'skills' => Skill::query()->ordered()->get(),
            'education' => TimelineEntry::query()->ordered()
                ->where('type', TimelineEntry::TypeEducation)
                ->get(),
            'experience' => TimelineEntry::query()->ordered()
                ->where('type', TimelineEntry::TypeExperience)
                ->get(),
        ]);
    }
}
