<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\TimelineEntry;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the public home page.
     */
    public function index(): Response
    {
        return Inertia::render('public/home', [
            'profile' => Profile::current(),
            'projects' => Project::query()->ordered()->where('featured', true)->get(),
            'services' => Service::query()->ordered()->get(),
            'journey' => TimelineEntry::query()->ordered()
                ->where('type', TimelineEntry::TypeJourney)
                ->get(),
        ]);
    }
}
