<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CompanyLocationController extends Controller
{
    public function index(Request $request)
    {
        try {
            $company = $request->user()->company;

            if (!$company) {
                return response()->json(['success' => false, 'message' => 'Company profile not found.'], 404);
            }

            $locations = $company->locations()->orderByDesc('is_headquarters')->get();

            return response()->json([
                'success' => true,
                'data' => $locations,
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Fetch Company Locations Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Unable to fetch locations.'], 500);
        }
    }

    /**
     * Store a new location.
     */
    public function store(Request $request)
    {
        try {
            $company = $request->user()->company;

            if (!$company) {
                return response()->json(['success' => false, 'message' => 'Company profile not found.'], 404);
            }

            $validated = $request->validate([
                'office_name' => ['nullable', 'string', 'max:100'],
                'address_line1' => ['required', 'string', 'max:255'],
                'address_line2' => ['nullable', 'string', 'max:255'],
                'city' => ['required', 'string', 'max:100'],
                'state' => ['nullable', 'string', 'max:100'],
                'country' => ['required', 'string', 'max:100'],
                'postal_code' => ['nullable', 'string', 'max:20'],
                'latitude' => ['nullable', 'numeric', 'between:-90,90'],
                'longitude' => ['nullable', 'numeric', 'between:-180,180'],
                'is_headquarters' => ['boolean'],
            ]);

            // If new location is set as HQ, reset other locations HQ status
            if (!empty($validated['is_headquarters']) && $validated['is_headquarters']) {
                $company->locations()->update(['is_headquarters' => false]);
            }

            $location = $company->locations()->create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Location added successfully.',
                'data' => $location,
            ], 201);
        } catch (\Throwable $e) {
            Log::error('Create Company Location Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to add location.'], 500);
        }
    }

    /**
     * Update an existing location.
     */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'office_name' => ['nullable', 'string', 'max:100'],
            'address_line1' => ['sometimes', 'required', 'string', 'max:255'],
            'address_line2' => ['nullable', 'string', 'max:255'],
            'city' => ['sometimes', 'required', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'country' => ['sometimes', 'required', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'is_headquarters' => ['nullable', 'boolean'],
        ]);

        try {
            $user = $request->user();

            // 2. Defensive Company Fetch
            $company = $user->company ?? Company::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'company_name' => $user->name,
                    'slug' => Str::slug($user->name) . '-' . Str::random(5),
                ]
            );

            // 3. Security Check: Location belongs to this company
            $location = $company->locations()->find($id);

            if (!$location) {
                return response()->json([
                    'success' => false,
                    'message' => 'Location not found or unauthorized.'
                ], 404);
            }

            // 4. Handle Headquarters Flag Reset
            if (!empty($validated['is_headquarters']) && $validated['is_headquarters']) {
                $company->locations()->where('id', '!=', $id)->update(['is_headquarters' => false]);
            }

            $location->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Location updated successfully.',
                'data' => $location,
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Update Company Location Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update location.'
            ], 500);
        }
    }

    /**
     * Delete a location.
     */
    public function destroy(Request $request, int $id)
    {
        try {
            $company = $request->user()->company;

            $location = $company->locations()->find($id);

            if (!$location) {
                return response()->json(['success' => false, 'message' => 'Location not found or unauthorized.'], 404);
            }

            $location->delete();

            return response()->json([
                'success' => true,
                'message' => 'Location deleted successfully.',
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Delete Company Location Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to delete location.'], 500);
        }
    }
}
