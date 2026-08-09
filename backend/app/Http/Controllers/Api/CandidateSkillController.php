<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CandidateProfile;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class CandidateSkillController extends Controller
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
     * Get all attached skills for logged-in candidate.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $candidate = $this->getCandidateProfile($request);

            $skills = $candidate->skills->map(function ($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name,
                    'slug' => $skill->slug,
                    'experience_years' => $skill->pivot->experience_years,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $skills,
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Fetch Candidate Skills Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Unable to fetch skills.',
            ], 500);
        }
    }

    /**
     * Attach / Add skills to candidate profile.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $candidate = $this->getCandidateProfile($request);

            $validated = $request->validate([
                'skills' => ['required', 'array', 'min:1'],
                'skills.*.skill_id' => ['required', 'exists:skills,id'],
                'skills.*.experience_years' => ['nullable', 'integer', 'min:0', 'max:50'],
            ]);

            $syncData = [];
            foreach ($validated['skills'] as $item) {
                $syncData[$item['skill_id']] = [
                    'experience_years' => $item['experience_years'] ?? null,
                ];
            }

            // syncWithoutDetaching prevents deleting previously added skills
            $candidate->skills()->syncWithoutDetaching($syncData);

            return response()->json([
                'success' => true,
                'message' => 'Skills added successfully.',
                'data' => $candidate->fresh()->skills,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Store Candidate Skills Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to attach skills.',
            ], 500);
        }
    }

    /**
     * Update experience_years for a specific attached skill.
     */
    public function update(Request $request, int $skillId): JsonResponse
    {
        try {
            $candidate = $this->getCandidateProfile($request);

            $validated = $request->validate([
                'experience_years' => ['required', 'integer', 'min:0', 'max:50'],
            ]);

            // Check if skill is attached
            if (! $candidate->skills()->where('skill_id', $skillId)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Skill not found in candidate profile.',
                ], 404);
            }

            // Update pivot table row
            $candidate->skills()->updateExistingPivot($skillId, [
                'experience_years' => $validated['experience_years'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Skill experience updated successfully.',
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Update Candidate Skill Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update skill.',
            ], 500);
        }
    }

    /**
     * Detach / Remove skill from candidate profile.
     */
    public function destroy(Request $request, int $skillId): JsonResponse
    {
        try {
            $candidate = $this->getCandidateProfile($request);

            if (! $candidate->skills()->where('skill_id', $skillId)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Skill not found in candidate profile.',
                ], 404);
            }

            $candidate->skills()->detach($skillId);

            return response()->json([
                'success' => true,
                'message' => 'Skill removed successfully.',
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Delete Candidate Skill Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to remove skill.',
            ], 500);
        }
    }
}
