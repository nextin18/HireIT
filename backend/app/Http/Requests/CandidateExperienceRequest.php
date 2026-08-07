<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CandidateExperienceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->hasRole('Candidate');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $candidateProfile = $this->user()->candidateProfile;

        return [
            'company_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('candidate_experiences')->where(function ($query) use ($candidateProfile) {
                    return $query
                        ->where('candidate_id', $candidateProfile->id ?? null)
                        ->where('designation', $this->designation)
                        ->where('start_date', $this->start_date);
                })->ignore($this->route('id')),
            ],
            'designation' => ['required', 'string', 'max:255'],
            'job_location' => ['nullable', 'string', 'max:255'],
            'job_type' => [
                'nullable',
                Rule::in([
                    'Full-time', 'Part-time', 'Contract', 'Temporary',
                    'Internship', 'Freelance', 'Externship', 'Volunteer', 'Other'
                ]),
            ],
            'work_mode' => ['required', Rule::in(['On-site', 'Remote', 'Hybrid'])],
            'start_date' => ['required', 'date'],
            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
                Rule::requiredIf(fn() => !$this->boolean('is_current')),
            ],
            'is_current' => ['boolean'],
            'description' => ['nullable', 'string', 'max:5000'],
            'skills_used' => ['nullable', 'string', 'max:1000'],
            'is_paid' => ['boolean'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'salary_period' => [
                'nullable',
                'required_with:salary',
                Rule::in(['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly']),
            ],
        ];
    }
}
