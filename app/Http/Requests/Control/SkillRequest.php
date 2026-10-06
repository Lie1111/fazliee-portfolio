<?php

namespace App\Http\Requests\Control;

use Illuminate\Foundation\Http\FormRequest;

class SkillRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:80'],
            'category' => ['required', 'string', 'max:60'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
