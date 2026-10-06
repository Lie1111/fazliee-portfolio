<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\StoreContactMessageRequest;
use App\Models\ContactMessage;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Show the public contact page.
     */
    public function index(): Response
    {
        return Inertia::render('public/contact', [
            'profile' => Profile::current(),
        ]);
    }

    /**
     * Store a new contact message submitted from the public site.
     */
    public function store(StoreContactMessageRequest $request): RedirectResponse
    {
        ContactMessage::query()->create($request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Thanks! Your message is on its way.'),
        ]);

        return to_route('contact');
    }
}
