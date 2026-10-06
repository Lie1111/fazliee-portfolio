<?php

namespace App\Http\Controllers\Control;

use App\Http\Controllers\Controller;
use App\Http\Requests\Control\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Show the list of services.
     */
    public function index(): Response
    {
        return Inertia::render('control/services/index', [
            'services' => Service::query()->ordered()->get(),
        ]);
    }

    /**
     * Show the form for creating a service.
     */
    public function create(): Response
    {
        return Inertia::render('control/services/form', [
            'service' => null,
        ]);
    }

    /**
     * Store a newly created service.
     */
    public function store(ServiceRequest $request): RedirectResponse
    {
        Service::query()->create($this->payload($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Service created.')]);

        return to_route('control.services.index');
    }

    /**
     * Show the form for editing a service.
     */
    public function edit(Service $service): Response
    {
        return Inertia::render('control/services/form', [
            'service' => $service,
        ]);
    }

    /**
     * Update the given service.
     */
    public function update(ServiceRequest $request, Service $service): RedirectResponse
    {
        $service->update($this->payload($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Service updated.')]);

        return to_route('control.services.index');
    }

    /**
     * Delete the given service.
     */
    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Service deleted.')]);

        return to_route('control.services.index');
    }

    /**
     * Build the service attributes from the validated request.
     *
     * @return array<string, mixed>
     */
    private function payload(ServiceRequest $request): array
    {
        $data = $request->validated();

        $data['items'] = $data['items'] ?? [];
        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $data;
    }
}
