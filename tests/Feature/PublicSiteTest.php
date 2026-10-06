<?php

use App\Models\ContactMessage;
use App\Models\Profile;
use App\Models\Project;

test('public pages render for guests', function (string $routeName) {
    Profile::factory()->create();

    $this->get(route($routeName))->assertOk();
})->with([
    'home' => 'home',
    'work' => 'work.index',
    'what i do' => 'what-i-do',
    'about' => 'about',
    'contact' => 'contact',
]);

test('a project case study page renders', function () {
    Profile::factory()->create();
    $project = Project::factory()->create();

    $this->get(route('work.show', $project))->assertOk();
});

test('the contact form stores a message and redirects', function () {
    Profile::factory()->create();

    $response = $this->post(route('contact.store'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'project_type' => 'Website',
        'message' => 'I would love to work with you.',
    ]);

    $response->assertRedirect(route('contact'));

    expect(ContactMessage::query()->count())->toBe(1);

    $this->assertDatabaseHas('contact_messages', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'project_type' => 'Website',
    ]);
});

test('the contact form validates required fields', function () {
    Profile::factory()->create();

    $this->post(route('contact.store'), [])
        ->assertSessionHasErrors(['name', 'email', 'message']);

    expect(ContactMessage::query()->count())->toBe(0);
});
