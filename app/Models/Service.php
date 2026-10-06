<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $number
 * @property string $title
 * @property string $description
 * @property string|null $icon
 * @property array<int, string>|null $items
 * @property int $sort_order
 */
#[Fillable(['number', 'title', 'description', 'icon', 'items', 'sort_order'])]
class Service extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'items' => 'array',
        ];
    }

    /**
     * Order services by their display position.
     *
     * @param  Builder<Service>  $query
     */
    public function scopeOrdered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }
}
