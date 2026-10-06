<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $type
 * @property string $title
 * @property string|null $organisation
 * @property string|null $period
 * @property string|null $description
 * @property int $sort_order
 */
#[Fillable(['type', 'title', 'organisation', 'period', 'description', 'sort_order'])]
class TimelineEntry extends Model
{
    public const TypeEducation = 'education';

    public const TypeExperience = 'experience';

    public const TypeJourney = 'journey';

    /**
     * The available entry types.
     *
     * @var array<int, string>
     */
    public const Types = [self::TypeEducation, self::TypeExperience, self::TypeJourney];

    /**
     * Order entries by their display position.
     *
     * @param  Builder<TimelineEntry>  $query
     */
    public function scopeOrdered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }
}
