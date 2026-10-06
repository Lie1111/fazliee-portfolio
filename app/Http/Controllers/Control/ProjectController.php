<?php

namespace App\Http\Controllers\Control;

use App\Http\Controllers\Controller;
use App\Http\Requests\Control\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Show the list of projects.
     */
    public function index(): Response
    {
        return Inertia::render('control/projects/index', [
            'projects' => Project::query()->ordered()->get(),
        ]);
    }

    /**
     * Show the form for creating a project.
     */
    public function create(): Response
    {
        return Inertia::render('control/projects/form', [
            'project' => null,
        ]);
    }

    /**
     * Store a newly created project.
     */
    public function store(ProjectRequest $request): RedirectResponse
    {
        Project::query()->create($this->payload($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Project created.')]);

        return to_route('control.projects.index');
    }

    /**
     * Show the form for editing a project.
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('control/projects/form', [
            'project' => $project,
        ]);
    }

    /**
     * Update the given project.
     */
    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $project->update($this->payload($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Project updated.')]);

        return to_route('control.projects.index');
    }

    /**
     * Delete the given project.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Project deleted.')]);

        return to_route('control.projects.index');
    }

    /**
     * Build the project attributes from the validated request.
     *
     * @return array<string, mixed>
     */
    private function payload(ProjectRequest $request): array
    {
        $data = $request->validated();

        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $data['tools'] = $data['tools'] ?? [];
        $data['results'] = $data['results'] ?? [];
        $data['featured'] = $request->boolean('featured');
        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $data;
    }
}
