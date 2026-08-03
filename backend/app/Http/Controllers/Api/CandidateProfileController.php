<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCandidateProfileRequest;
use App\Models\CandidateProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CandidateProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            // Fetch profile or create empty fallback record
            $profile = CandidateProfile::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'headline' => '',
                    'resume_path' => '',
                    'experience_years' => 0,
                    'current_salary' => 0.0,
                    'expected_salary' => 0.0,
                    'bio' => '',
                ]
            );

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone_number' => $user->phone_number,
                    ],
                    'profile' => [
                        'id' => $profile->id,
                        'headline' => $profile->headline,
                        'website' => $profile->website,
                        'resume_url' => $profile->resume_path ? asset('storage/' . $profile->resume_path) : null,
                        'experience_years' => $profile->experience_years,
                        'current_salary' => $profile->current_salary,
                        'expected_salary' => $profile->expected_salary,
                        'bio' => $profile->bio,
                        'updated_at' => $profile->updated_at,
                    ],
                ],
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Fetch Candidate Profile Error: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to fetch profile details.',
            ], 500);
        }
    }

    /**
     * Update or create authenticated candidate's profile.
     */
    public function update(UpdateCandidateProfileRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $user = $request->user();
            $validated = $request->validated();

            // Fetch existing profile or instantiate
            $profile = CandidateProfile::firstOrNew(['user_id' => $user->id]);

            // Handle Resume Upload
            if ($request->hasFile('resume')) {
                // Delete old resume if present
                if ($profile->resume_path && Storage::disk('public')->exists($profile->resume_path)) {
                    Storage::disk('public')->delete($profile->resume_path);
                }

                // Store new file in 'resumes' folder
                $path = $request->file('resume')->store('resumes', 'public');
                $profile->resume_path = $path;
            }

            // Fill text details
            if (array_key_exists('headline', $validated)) {
                $profile->headline = $validated['headline'];
            }
            if (array_key_exists('experience_years', $validated)) {
                $profile->experience_years = $validated['experience_years'];
            }
            if (array_key_exists('current_salary', $validated)) {
                $profile->current_salary = $validated['current_salary'];
            }
            if (array_key_exists('expected_salary', $validated)) {
                $profile->expected_salary = $validated['expected_salary'];
            }
            if (array_key_exists('bio', $validated)) {
                $profile->bio = $validated['bio'];
            }

            $profile->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Candidate profile updated successfully.',
                'data' => [
                    'id' => $profile->id,
                    'headline' => $profile->headline,
                    'resume_url' => $profile->resume_path ? asset('storage/' . $profile->resume_path) : null,
                    'experience_years' => $profile->experience_years,
                    'current_salary' => $profile->current_salary,
                    'expected_salary' => $profile->expected_salary,
                    'bio' => $profile->bio,
                ],
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Update Candidate Profile Error: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile. Please try again.',
            ], 500);
        }
    }
}
