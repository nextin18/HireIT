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
use App\Services\ImageKitService;

class CompanyController extends Controller
{

    protected ImageKitService $imageKit;

    public function __construct(ImageKitService $imageKit)
    {
        $this->imageKit = $imageKit;
    }
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

            // 1. Logo update (Delete Old + Upload New)
            if ($request->hasFile('logo')) {
                if (!empty($company->logo)) {
                    $this->imageKit->deleteByUrl($company->logo);
                }
                $validated['logo'] = $this->imageKit->upload($request->file('logo'), '/companies/logos');
            }

            // 2. Cover image update (Delete Old + Upload New)
            if ($request->hasFile('cover_image')) {
                if (!empty($company->cover_image)) {
                    $this->imageKit->deleteByUrl($company->cover_image);
                }
                $validated['cover_image'] = $this->imageKit->upload($request->file('cover_image'), '/companies/covers');
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
                    'logo_url' => $company->logo,
                    'cover_image_url' => $company->cover_image,
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
