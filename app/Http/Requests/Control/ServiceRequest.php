<?php

namespace App\Http\Requests\Control;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
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
            'number' => ['required', 'string', 'max:8'],
            'title' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:1000'],
            'icon' => ['nullable', 'string', 'max:60'],
            'items' => ['nullable', 'array'],
            'items.*' => ['string', 'max:60'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
