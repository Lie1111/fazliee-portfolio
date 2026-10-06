<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $category
 * @property string|null $client
 * @property string|null $year
 * @property string|null $role
 * @property array<int, string>|null $tools
 * @property string $summary
 * @property string|null $challenge
 * @property string|null $process
 * @property string|null $solution
 * @property array<int, array{label: string, value: string}>|null $results
 * @property string|null $thumbnail
 * @property string|null $hero_media
 * @property string|null $demo_url
 * @property string|null $badge
 * @property bool $featured
 * @property int $sort_order
 */
#[Fillable([
    'title',
    'slug',
    'category',
    'client',
    'year',
    'role',
    'tools',
    'summary',
    'challenge',
    'process',
    'solution',
    'results',
    'thumbnail',
    'hero_media',
    'demo_url',
    'badge',
    'featured',
    'sort_order',
])]
class Project extends Model
{
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tools' => 'array',
            'results' => 'array',
            'featured' => 'boolean',
        ];
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Order projects by their display position.
     *
     * @param  Builder<Project>  $query
     */
    public function scopeOrdered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }
}
