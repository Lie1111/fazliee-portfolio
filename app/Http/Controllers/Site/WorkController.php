<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class WorkController extends Controller
{
    /**
     * Show the public work listing page.
     */
    public function index(): Response
    {
        return Inertia::render('public/work', [
            'projects' => Project::query()->ordered()->get(),
            'categories' => Project::query()->ordered()->pluck('category')->unique()->values(),
        ]);
    }

    /**
     * Show a single project case study.
     */
    public function show(Project $project): Response
    {
        $nextProject = Project::query()->ordered()
            ->where('sort_order', '>', $project->sort_order)
            ->first()
            ?? Project::query()->ordered()->whereKeyNot($project->getKey())->first();

        return Inertia::render('public/case-study', [
            'project' => $project,
            'nextProject' => $nextProject,
        ]);
    }
}
