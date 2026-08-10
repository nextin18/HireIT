<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Candidate;
use App\Models\CandidateEducation;
use App\Models\CandidateProfile;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class CandidateEducationController extends Controller
{
    /**
     * Get or create candidate profile for logged-in user.
     */
    private function getCandidateProfile(Request $request): CandidateProfile
    {
        $user = $request->user();

        return $user->candidateProfile ?? CandidateProfile::firstOrCreate([
            'user_id' => $user->id,
        ]);
    }

    /**
     * Fetch all education records of logged-in candidate.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $candidate = $this->getCandidateProfile($request);

            $educations = $candidate->educations()
                ->orderByDesc('start_date')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $educations,
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Fetch Candidate Educations Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Unable to fetch education records.',
            ], 500);
        }
    }

    /**
     * Store a new education record.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $candidate = $this->getCandidateProfile($request);

            $validated = $request->validate([
                'education_level' => ['required', Rule::in(['10th', '12th', 'Diploma', 'Bachelor', 'Master', 'PhD', 'Other'])],
                'institution_name' => ['required', 'string', 'max:255'],
                'degree' => ['required', 'string', 'max:255'],
                'field_of_study' => ['nullable', 'string', 'max:255'],
                'institution_location' => ['nullable', 'string', 'max:255'],
                'study_mode' => ['nullable', Rule::in(['Full-time', 'Part-time', 'Online', 'Distance'])],
                'start_date' => ['required', 'date', 'date_format:Y-m-d'],
                'is_current' => ['nullable', 'boolean'],
                'end_date' => ['nullable', 'required_if:is_current,false,0', 'date', 'date_format:Y-m-d', 'after_or_equal:start_date'],
                'grade_or_score' => ['nullable', 'string', 'max:50'],
                'grade_type' => ['nullable', Rule::in(['CGPA', 'Percentage', 'GPA', 'Grade', 'Other'])],
                'description' => ['nullable', 'string', 'max:3000'],
                'achievements' => ['nullable', 'string', 'max:3000'],
            ]);

            // If user is currently studying here, clear end_date
            if (! empty($validated['is_current']) && $validated['is_current']) {
                $validated['end_date'] = null;
            }

            $education = $candidate->educations()->create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Education record added successfully.',
                'data' => $education,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $e->errors(),
            ], 422);

        } catch (QueryException $e) {
            // Unique Constraint Violation Handle (unique_candidate_education_entry)
            if ($e->getCode() === '23000' || str_contains($e->getMessage(), 'unique_candidate_education_entry')) {
                return response()->json([
                    'success' => false,
                    'message' => 'An education record with same degree, institution, and start date already exists.',
                ], 409);
            }

            Log::error('Store Candidate Education DB Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => 'Database error occurred.'], 500);

        } catch (\Throwable $e) {
            Log::error('Store Candidate Education Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => 'Failed to add education record.'], 500);
        }
    }

    /**
     * Show specific education record.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        try {
            $candidate = $this->getCandidateProfile($request);
            $education = $candidate->educations()->find($id);

            if (! $education) {
                return response()->json(['success' => false, 'message' => 'Education record not found or unauthorized.'], 404);
            }

            return response()->json(['success' => true, 'data' => $education], 200);

        } catch (\Throwable $e) {
            Log::error('Show Candidate Education Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => 'Unable to fetch record.'], 500);
        }
    }

    /**
     * Update an existing education record.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $candidate = $this->getCandidateProfile($request);
            $education = $candidate->educations()->find($id);

            if (! $education) {
                return response()->json(['success' => false, 'message' => 'Education record not found or unauthorized.'], 404);
            }

            $validated = $request->validate([
                'education_level' => ['sometimes', 'required', Rule::in(['10th', '12th', 'Diploma', 'Bachelor', 'Master', 'PhD', 'Other'])],
                'institution_name' => ['sometimes', 'required', 'string', 'max:255'],
                'degree' => ['sometimes', 'required', 'string', 'max:255'],
                'field_of_study' => ['nullable', 'string', 'max:255'],
                'institution_location' => ['nullable', 'string', 'max:255'],
                'study_mode' => ['nullable', Rule::in(['Full-time', 'Part-time', 'Online', 'Distance'])],
                'start_date' => ['sometimes', 'required', 'date', 'date_format:Y-m-d'],
                'is_current' => ['nullable', 'boolean'],
                'end_date' => ['nullable', 'date', 'date_format:Y-m-d', 'after_or_equal:start_date'],
                'grade_or_score' => ['nullable', 'string', 'max:50'],
                'grade_type' => ['nullable', Rule::in(['CGPA', 'Percentage', 'GPA', 'Grade', 'Other'])],
                'description' => ['nullable', 'string', 'max:3000'],
                'achievements' => ['nullable', 'string', 'max:3000'],
            ]);

            if (isset($validated['is_current']) && $validated['is_current']) {
                $validated['end_date'] = null;
            }

            $education->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Education record updated successfully.',
                'data' => $education,
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $e->errors(),
            ], 422);

        } catch (QueryException $e) {
            if ($e->getCode() === '23000' || str_contains($e->getMessage(), 'unique_candidate_education_entry')) {
                return response()->json([
                    'success' => false,
                    'message' => 'An education record with same degree, institution, and start date already exists.',
                ], 409);
            }

            return response()->json(['success' => false, 'message' => 'Database error occurred.'], 500);

        } catch (\Throwable $e) {
            Log::error('Update Candidate Education Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => 'Failed to update education record.'], 500);
        }
    }

    /**
     * Delete an education record.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            $candidate = $this->getCandidateProfile($request);
            $education = $candidate->educations()->find($id);

            if (! $education) {
                return response()->json(['success' => false, 'message' => 'Education record not found or unauthorized.'], 404);
            }

            $education->delete();

            return response()->json([
                'success' => true,
                'message' => 'Education record deleted successfully.',
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Delete Candidate Education Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => 'Failed to delete education record.'], 500);
        }
    }
}
