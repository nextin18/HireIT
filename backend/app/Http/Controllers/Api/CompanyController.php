<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCompanyProfileRequest;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\User;

class CompanyController extends Controller
{
    /**
     * Get or create company profile for logged-in user.
     */
    private function getCompanyProfile(User $user): Company
    {
        return $user->company ?? Company::create([
            'user_id' => $user->id,
            'company_name' => $user->name,
            'slug' => Str::slug($user->name) . '-' . Str::random(5),
            'status' => 'active',
            'is_verified' => false,
        ]);
    }

    /**
     * Fetch authenticated company profile.
     */
    public function show(Request $request)
    {
        try {
            $user = $request->user();
            $company = $this->getCompanyProfile($user);

            // Load locations & social links
            $company->load(['locations', 'socialLinks']);

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone_number' => $user->phone_number,
                    ],
                    'company' => [
                        'id' => $company->id,
                        'company_name' => $company->company_name,
                        'slug' => $company->slug,
                        'tagline' => $company->tagline,
                        'logo_url' => $company->logo ? Storage::url($company->logo) : null,
                        'cover_image_url' => $company->cover_image ? Storage::url($company->cover_image) : null,
                        'website' => $company->website,
                        'industry' => $company->industry,
                        'company_size' => $company->company_size,
                        'company_type' => $company->company_type,
                        'founded_year' => $company->founded_year,
                        'about' => $company->about,
                        'registration_number' => $company->registration_number,
                        'is_verified' => $company->is_verified,  // Read-only
                        'status' => $company->status,  // Read-only
                        'updated_at' => $company->updated_at,
                    ],
                    'locations' => $company->locations,
                    'social_links' => $company->socialLinks,
                ],
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Fetch Company Profile Error: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to fetch company profile.',
            ], 500);
        }
    }

    /**
     * Update company profile (Handles text & File uploads).
     */
    public function update(UpdateCompanyProfileRequest $request)
    {
        DB::beginTransaction();

        try {
            $user = $request->user();
            $company = $this->getCompanyProfile($user);
            $validated = $request->validated();

            // Handle Logo Upload
            if ($request->hasFile('logo')) {
                if ($company->logo && Storage::disk('public')->exists($company->logo)) {
                    Storage::disk('public')->delete($company->logo);
                }
                $validated['logo'] = $request->file('logo')->store('companies/logos', 'public');
            }

            // Handle Cover Image Upload
            if ($request->hasFile('cover_image')) {
                if ($company->cover_image && Storage::disk('public')->exists($company->cover_image)) {
                    Storage::disk('public')->delete($company->cover_image);
                }
                $validated['cover_image'] = $request->file('cover_image')->store('companies/covers', 'public');
            }

            // Update slug if company_name changes
            if (! empty($validated['company_name']) && $validated['company_name'] !== $company->company_name) {
                $validated['slug'] = Str::slug($validated['company_name']) . '-' . Str::random(5);
            }

            // Update only allowed fields
            $company->update($validated);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Company profile updated successfully.',
                'data' => [
                    'id' => $company->id,
                    'company_name' => $company->company_name,
                    'slug' => $company->slug,
                    'logo_url' => $company->logo ? asset('storage/' . $company->logo) : null,
                    'cover_image_url' => $company->cover_image ? asset('storage/' . $company->cover_image) : null,
                    'tagline' => $company->tagline,
                    'website' => $company->website,
                    'industry' => $company->industry,
                    'company_size' => $company->company_size,
                    'company_type' => $company->company_type,
                    'founded_year' => $company->founded_year,
                    'about' => $company->about,
                    'registration_number' => $company->registration_number,
                ],
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Update Company Profile Error: ' . $e->getMessage(), [
                'user_id' => $request->user()->id,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update company profile.',
            ], 500);
        }
    }
}
