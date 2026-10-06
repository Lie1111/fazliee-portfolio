<?php

namespace App\Http\Controllers\Control;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\TimelineEntry;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the control panel dashboard.
     */
    public function index(): Response
    {
        return Inertia::render('control/dashboard', [
            'stats' => [
                'projects' => Project::query()->count(),
                'services' => Service::query()->count(),
                'skills' => Skill::query()->count(),
                'timeline' => TimelineEntry::query()->count(),
                'messages' => ContactMessage::query()->count(),
                'unreadMessages' => ContactMessage::query()->unread()->count(),
            ],
            'recentMessages' => ContactMessage::query()->latest()->limit(5)->get(),
        ]);
    }
}
