<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CandidateExperienceRequest;
use App\Models\CandidateExperience;
use App\Models\CandidateProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CandidateExperienceController extends Controller
{
    public function index(Request $request)
    {
        try {
            $candidateProfile = $request->user()->candidateProfile;

            if (!$candidateProfile) {
                return response()->json([
                    'success' => true,
                    'data' => [],
                ], 200);
            }

            $experiences = $candidateProfile
                ->experiences()
                ->orderBy('is_current', 'desc')
                ->orderBy('start_date', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $experiences,
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Fetch Candidate Experiences Error: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to load candidate experiences.',
            ], 500);
        }
    }

    public function store(CandidateExperienceRequest $request)
    {
        DB::beginTransaction();

        try {
            $user = $request->user();

            // Get or create candidate profile
            $candidateProfile = $user->candidateProfile()->firstOrCreate([
                'user_id' => $user->id,
            ]);

            $validated = $request->validated();

            // If currently working, reset end_date to null
            if (!empty($validated['is_current']) && $validated['is_current']) {
                $validated['end_date'] = null;
            }

            $experience = $candidateProfile->experiences()->create($validated);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Work experience added successfully.',
                'data' => $experience,
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Store Candidate Experience Error: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to save experience record.',
            ], 500);
        }
    }

    public function show(int $id)
    {
        try {
            $experience = CandidateExperience::with('candidateProfile')->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $experience,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Show Candidate Experience Error: ' . $e->getMessage(), [
                'experience_id' => $id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Experience not found.',
            ], 404);
        }
    }

    public function update(CandidateExperienceRequest $request, int $id)
    {
        DB::beginTransaction();

        try {
            $candidateProfile = $request->user()->candidateProfile;

            if (!$candidateProfile) {
                return response()->json([
                    'success' => false,
                    'message' => 'Candidate profile not found.',
                ], 404);
            }

            $experience = $candidateProfile->experiences()->find($id);

            if (!$experience) {
                return response()->json([
                    'success' => false,
                    'message' => 'Experience record not found or unauthorized.',
                ], 404);
            }

            $validated = $request->validated();

            if (!empty($validated['is_current']) && $validated['is_current']) {
                $validated['end_date'] = null;
            }

            $experience->update($validated);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Work experience updated successfully.',
                'data' => $experience,
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Update Candidate Experience Error: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'experience_id' => $id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update experience record.',
            ], 500);
        }
    }

    public function destroy(Request $request, int $id)
    {
        DB::beginTransaction();

        try {
            $candidateProfile = $request->user()->candidateProfile;

            if (!$candidateProfile) {
                return response()->json([
                    'success' => false,
                    'message' => 'Candidate profile not found.',
                ], 404);
            }

            $experience = $candidateProfile->experiences()->find($id);

            if (!$experience) {
                return response()->json([
                    'success' => false,
                    'message' => 'Experience record not found or unauthorized.',
                ], 404);
            }

            $experience->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Experience record deleted successfully.',
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Delete Candidate Experience Error: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'experience_id' => $id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete experience record.',
            ], 500);
        }
    }

    /**
     * Helper method to calculate and update total experience_years
     */
    private function updateTotalExperience(CandidateProfile $profile)
    {
        // Get all experiences (including soft-deleted ones to maintain accuracy)
        $experiences = CandidateExperience::where('candidate_id', $profile->id)
            ->get();

        $totalYears = 0;

        foreach ($experiences as $exp) {
            if ($exp->is_current && $exp->start_date) {
                // Current job: calculate from start date to today
                $totalYears += $exp->start_date->diffInYears(now());
            } elseif ($exp->start_date && $exp->end_date) {
                // Completed job: calculate from start to end
                $totalYears += $exp->start_date->diffInYears($exp->end_date);
            }
        }
        $experience = $profile->experience;
        // Round to nearest whole number or keep decimal?
        // Usually recruiters prefer whole numbers for "X years experience"
        $profile->update([
            'experience_years' => floor($totalYears),  // Use floor to be conservative
        ]);
    }
}
