<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $category
 * @property int $sort_order
 */
#[Fillable(['name', 'category', 'sort_order'])]
class Skill extends Model
{
    /**
     * Order skills by their display position.
     *
     * @param  Builder<Skill>  $query
     */
    public function scopeOrdered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }
}
