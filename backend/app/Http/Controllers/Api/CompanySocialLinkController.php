<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanySocialLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class CompanySocialLinkController extends Controller
{
    public function index(Request $request)
    {
        try {
            $company = $request->user()->company;

            if (! $company) {
                return response()->json(['success' => false, 'message' => 'Company profile not found.'], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $company->socialLinks,
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Fetch Social Links Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => 'Unable to fetch social links.'], 500);
        }
    }

    /**
     * Store new social link or update existing platform (upsert pattern).
     */
    public function store(Request $request)
    {
        try {
            $company = $request->user()->company;

            if (! $company) {
                return response()->json(['success' => false, 'message' => 'Company profile not found.'], 404);
            }

            $validated = $request->validate([
                'platform' => ['required', 'string', 'max:50'],
                'url' => ['required', 'url', 'max:255'],
            ]);

            $socialLink = $company->socialLinks()->updateOrCreate(
                ['platform' => strtolower($validated['platform'])],
                ['url' => $validated['url']]
            );

            return response()->json([
                'success' => true,
                'message' => 'Social link saved successfully.',
                'data' => $socialLink,
            ], 200);

        } catch (ValidationException $e) {
            return response()->json(['success' => false, 'message' => 'Validation error.', 'errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            Log::error('Save Social Link Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => 'Failed to save social link.'], 500);
        }
    }

    /**
     * Update an existing social link by ID.
     */
    public function update(Request $request, int $id)
    {
        try {
            $company = $request->user()->company;

            if (! $company) {
                return response()->json(['success' => false, 'message' => 'Company profile not found.'], 404);
            }

            $socialLink = $company->socialLinks()->find($id);

            if (! $socialLink) {
                return response()->json(['success' => false, 'message' => 'Social link not found or unauthorized.'], 404);
            }

            $validated = $request->validate([
                'platform' => ['sometimes', 'required', 'string', 'max:50'],
                'url' => ['sometimes', 'required', 'url', 'max:255'],
            ]);

            if (isset($validated['platform'])) {
                $validated['platform'] = strtolower($validated['platform']);
            }

            $socialLink->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Social link updated successfully.',
                'data' => $socialLink,
            ], 200);

        } catch (ValidationException $e) {
            return response()->json(['success' => false, 'message' => 'Validation error.', 'errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            Log::error('Update Social Link Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => 'Failed to update social link.'], 500);
        }
    }

    /**
     * Delete a social link by ID.
     */
    public function destroy(Request $request, int $id)
    {
        try {
            $company = $request->user()->company;

            if (! $company) {
                return response()->json(['success' => false, 'message' => 'Company profile not found.'], 404);
            }

            $socialLink = $company->socialLinks()->find($id);

            if (! $socialLink) {
                return response()->json(['success' => false, 'message' => 'Social link not found or unauthorized.'], 404);
            }

            $socialLink->delete();

            return response()->json([
                'success' => true,
                'message' => 'Social link deleted successfully.',
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Delete Social Link Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => 'Failed to delete social link.'], 500);
        }
    }
}
