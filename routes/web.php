<?php

use App\Http\Controllers\Control\ContactMessageController;
use App\Http\Controllers\Control\DashboardController;
use App\Http\Controllers\Control\ProfileController as ControlProfileController;
use App\Http\Controllers\Control\ProjectController as ControlProjectController;
use App\Http\Controllers\Control\ServiceController as ControlServiceController;
use App\Http\Controllers\Control\SkillController as ControlSkillController;
use App\Http\Controllers\Control\TimelineEntryController as ControlTimelineEntryController;
use App\Http\Controllers\Site\AboutController;
use App\Http\Controllers\Site\ContactController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\WhatIDoController;
use App\Http\Controllers\Site\WorkController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public site
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('work', [WorkController::class, 'index'])->name('work.index');
Route::get('work/{project}', [WorkController::class, 'show'])->name('work.show');

Route::get('what-i-do', [WhatIDoController::class, 'index'])->name('what-i-do');
Route::get('about', [AboutController::class, 'index'])->name('about');

Route::get('contact', [ContactController::class, 'index'])->name('contact');
Route::post('contact', [ContactController::class, 'store'])->name('contact.store');

/*
|--------------------------------------------------------------------------
| Control panel (authenticated)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified'])
    ->prefix('control')
    ->name('control.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('profile', [ControlProfileController::class, 'edit'])->name('profile.edit');
        Route::put('profile', [ControlProfileController::class, 'update'])->name('profile.update');

        Route::resource('projects', ControlProjectController::class)->except('show');
        Route::resource('services', ControlServiceController::class)->except('show');
        Route::resource('skills', ControlSkillController::class)->except('show');
        Route::resource('timeline', ControlTimelineEntryController::class)->except('show');
        Route::resource('messages', ContactMessageController::class)->only(['index', 'show', 'destroy']);
    });

require __DIR__.'/settings.php';
