<?php

namespace App\Http\Controllers\Control;

use App\Http\Controllers\Controller;
use App\Http\Requests\Control\TimelineEntryRequest;
use App\Models\TimelineEntry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TimelineEntryController extends Controller
{
    /**
     * Show the list of timeline entries.
     */
    public function index(): Response
    {
        return Inertia::render('control/timeline/index', [
            'entries' => TimelineEntry::query()->ordered()->get(),
            'types' => TimelineEntry::Types,
        ]);
    }

    /**
     * Show the form for creating a timeline entry.
     */
    public function create(): Response
    {
        return Inertia::render('control/timeline/form', [
            'entry' => null,
            'types' => TimelineEntry::Types,
        ]);
    }

    /**
     * Store a newly created timeline entry.
     */
    public function store(TimelineEntryRequest $request): RedirectResponse
    {
        TimelineEntry::query()->create($this->payload($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Timeline entry created.')]);

        return to_route('control.timeline.index');
    }

    /**
     * Show the form for editing a timeline entry.
     */
    public function edit(TimelineEntry $timeline): Response
    {
        return Inertia::render('control/timeline/form', [
            'entry' => $timeline,
            'types' => TimelineEntry::Types,
        ]);
    }

    /**
     * Update the given timeline entry.
     */
    public function update(TimelineEntryRequest $request, TimelineEntry $timeline): RedirectResponse
    {
        $timeline->update($this->payload($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Timeline entry updated.')]);

        return to_route('control.timeline.index');
    }

    /**
     * Delete the given timeline entry.
     */
    public function destroy(TimelineEntry $timeline): RedirectResponse
    {
        $timeline->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Timeline entry deleted.')]);

        return to_route('control.timeline.index');
    }

    /**
     * Build the timeline entry attributes from the validated request.
     *
     * @return array<string, mixed>
     */
    private function payload(TimelineEntryRequest $request): array
    {
        $data = $request->validated();

        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $data;
    }
}
