<?php

namespace App\Http\Requests\Control;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
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
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'brand_name' => ['required', 'string', 'max:120'],
            'headline' => ['required', 'string', 'max:255'],
            'intro' => ['required', 'string', 'max:1000'],
            'about_story' => ['nullable', 'string', 'max:5000'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:40'],
            'location' => ['nullable', 'string', 'max:120'],
            'availability' => ['required', 'string', 'max:60'],
            'linkedin' => ['nullable', 'string', 'url', 'max:255'],
            'github' => ['nullable', 'string', 'url', 'max:255'],
            'resume_url' => ['nullable', 'string', 'max:255'],
        ];
    }
}
