<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string|null $project_type
 * @property string $message
 * @property Carbon|null $read_at
 */
#[Fillable(['name', 'email', 'project_type', 'message', 'read_at'])]
class ContactMessage extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
        ];
    }

    /**
     * Only include messages that have not been read yet.
     *
     * @param  Builder<ContactMessage>  $query
     */
    public function scopeUnread(Builder $query): void
    {
        $query->whereNull('read_at');
    }
}
