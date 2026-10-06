<?php

namespace App\Http\Controllers\Control;

use App\Http\Controllers\Controller;
use App\Http\Requests\Control\ProfileRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the form for editing the site profile.
     */
    public function edit(): Response
    {
        return Inertia::render('control/profile', [
            'profile' => Profile::current(),
        ]);
    }

    /**
     * Update the site profile.
     */
    public function update(ProfileRequest $request): RedirectResponse
    {
        $profile = Profile::current() ?? new Profile;

        $profile->fill($request->validated())->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile updated.')]);

        return to_route('control.profile.edit');
    }
}
