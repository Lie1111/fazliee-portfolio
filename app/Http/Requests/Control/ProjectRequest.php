<?php

namespace App\Http\Requests\Control;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
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
        $projectId = $this->route('project')?->getKey();

        return [
            'title' => ['required', 'string', 'max:160'],
            'slug' => [
                'nullable', 'string', 'max:180',
                Rule::unique('projects', 'slug')->ignore($projectId),
            ],
            'category' => ['required', 'string', 'max:60'],
            'client' => ['nullable', 'string', 'max:120'],
            'year' => ['nullable', 'string', 'max:12'],
            'role' => ['nullable', 'string', 'max:120'],
            'tools' => ['nullable', 'array'],
            'tools.*' => ['string', 'max:60'],
            'summary' => ['required', 'string', 'max:1000'],
            'challenge' => ['nullable', 'string', 'max:5000'],
            'process' => ['nullable', 'string', 'max:5000'],
            'solution' => ['nullable', 'string', 'max:5000'],
            'results' => ['nullable', 'array'],
            'results.*.label' => ['required_with:results', 'string', 'max:60'],
            'results.*.value' => ['required_with:results', 'string', 'max:60'],
            'thumbnail' => ['nullable', 'string', 'max:255'],
            'hero_media' => ['nullable', 'string', 'max:255'],
            'demo_url' => ['nullable', 'string', 'max:255'],
            'badge' => ['nullable', 'string', 'max:60'],
            'featured' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
