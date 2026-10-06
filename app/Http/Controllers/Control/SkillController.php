<?php

namespace App\Http\Controllers\Control;

use App\Http\Controllers\Controller;
use App\Http\Requests\Control\SkillRequest;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    /**
     * Show the list of skills.
     */
    public function index(): Response
    {
        return Inertia::render('control/skills/index', [
            'skills' => Skill::query()->ordered()->get(),
        ]);
    }

    /**
     * Show the form for creating a skill.
     */
    public function create(): Response
    {
        return Inertia::render('control/skills/form', [
            'skill' => null,
        ]);
    }

    /**
     * Store a newly created skill.
     */
    public function store(SkillRequest $request): RedirectResponse
    {
        Skill::query()->create($this->payload($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Skill created.')]);

        return to_route('control.skills.index');
    }

    /**
     * Show the form for editing a skill.
     */
    public function edit(Skill $skill): Response
    {
        return Inertia::render('control/skills/form', [
            'skill' => $skill,
        ]);
    }

    /**
     * Update the given skill.
     */
    public function update(SkillRequest $request, Skill $skill): RedirectResponse
    {
        $skill->update($this->payload($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Skill updated.')]);

        return to_route('control.skills.index');
    }

    /**
     * Delete the given skill.
     */
    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Skill deleted.')]);

        return to_route('control.skills.index');
    }

    /**
     * Build the skill attributes from the validated request.
     *
     * @return array<string, mixed>
     */
    private function payload(SkillRequest $request): array
    {
        $data = $request->validated();

        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $data;
    }
}
