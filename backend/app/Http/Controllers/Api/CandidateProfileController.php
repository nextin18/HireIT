<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCandidateProfileRequest;
use App\Models\CandidateProfile;
use App\Services\ImageKitService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CandidateProfileController extends Controller
{
    protected ImageKitService $imageKit;

    public function __construct(ImageKitService $imageKit)
    {
        $this->imageKit = $imageKit;
    }

    public function show(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            // Fetch profile or create empty fallback record
            $profile = CandidateProfile::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'headline' => '',
                    'website' => '',
                    'resume_path' => '',
                    'experience_years' => 'Fresher',
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
                        'resume_url' => $profile->resume_path ? (str_starts_with($profile->resume_path, 'http') ? $profile->resume_path : asset('storage/' . $profile->resume_path)) : null,
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

            if ($request->hasFile('resume_path')) {
                $resumeFile = $request->file('resume_path');

                if ($resumeFile && $resumeFile->isValid()) {
                    // 1. Explicitly fetch old resume URL from DB record
                    $oldResumeUrl = $profile->getOriginal('resume_path') ?? $profile->resume_path;

                    // 2. Delete old resume from ImageKit
                    if (!empty($oldResumeUrl)) {
                        $this->imageKit->deleteByUrl($oldResumeUrl);
                    }

                    // 3. Upload new resume to ImageKit
                    $newResumeUrl = $this->imageKit->upload($resumeFile, '/candidates/resumes');

                    $validated['resume_path'] = $newResumeUrl;
                    $profile->resume_path = $newResumeUrl;  // Direct assign on model to ensure sync
                }
            }

            // Fill text details
            if (array_key_exists('headline', $validated)) {
                $profile->headline = $validated['headline'];
            }
            if (array_key_exists('resume_path', $validated)) {
                $profile->resume_path = $validated['resume_path'];
            }
            if (array_key_exists('website', $validated)) {
                $profile->website = $validated['website'];
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
                    'resume_url' => $profile->resume_path,
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
