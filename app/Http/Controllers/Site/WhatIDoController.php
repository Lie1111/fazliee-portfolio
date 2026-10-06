<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class WhatIDoController extends Controller
{
    /**
     * Show the public "What I Do" page.
     */
    public function index(): Response
    {
        return Inertia::render('public/what-i-do', [
            'services' => Service::query()->ordered()->get(),
        ]);
    }
}
