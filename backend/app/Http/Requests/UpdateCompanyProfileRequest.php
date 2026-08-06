<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->hasRole('Company');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_name' => ['required', 'string', 'max:255'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
            'industry' => ['nullable', 'string', 'max:100'],
            'company_size' => ['nullable', 'string', 'max:100'],
            'company_type' => ['nullable', 'string', 'max:50'],
            'founded_year' => ['nullable', 'integer', 'digits:4', 'min:1800', 'max:' . date('Y')],
            'about' => ['nullable', 'string', 'max:5000'],
            'registration_number' => ['nullable', 'string', 'max:100'],
            // File uploads
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],  // Max 2MB
            'cover_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5012'],  // Max 5MB
        ];
    }
}
