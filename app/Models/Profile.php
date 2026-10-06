<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $brand_name
 * @property string $headline
 * @property string $intro
 * @property string|null $about_story
 * @property string $email
 * @property string|null $phone
 * @property string|null $location
 * @property string $availability
 * @property string|null $linkedin
 * @property string|null $github
 * @property string|null $resume_url
 */
#[Fillable([
    'name',
    'brand_name',
    'headline',
    'intro',
    'about_story',
    'email',
    'phone',
    'location',
    'availability',
    'linkedin',
    'github',
    'resume_url',
])]
class Profile extends Model
{
    use HasFactory;

    /**
     * Get the single profile record, if one exists.
     */
    public static function current(): ?self
    {
        return static::query()->first();
    }
}
