<?php

namespace App\Http\Requests\Control;

use App\Models\TimelineEntry;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TimelineEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', Rule::in(TimelineEntry::Types)],
            'title' => ['required', 'string', 'max:160'],
            'organisation' => ['nullable', 'string', 'max:160'],
            'period' => ['nullable', 'string', 'max:60'],
            'description' => ['nullable', 'string', 'max:1000'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
