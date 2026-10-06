<?php

namespace App\Http\Controllers\Control;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    /**
     * Show the list of contact messages.
     */
    public function index(): Response
    {
        return Inertia::render('control/messages/index', [
            'messages' => ContactMessage::query()->latest()->get(),
        ]);
    }

    /**
     * Show a single contact message and mark it as read.
     */
    public function show(ContactMessage $message): Response
    {
        if ($message->read_at === null) {
            $message->update(['read_at' => now()]);
        }

        return Inertia::render('control/messages/show', [
            'message' => $message->fresh(),
        ]);
    }

    /**
     * Delete the given contact message.
     */
    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Message deleted.')]);

        return to_route('control.messages.index');
    }
}
