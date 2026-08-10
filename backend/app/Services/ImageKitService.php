<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ImageKitService
{
    protected string $privateKey;
    protected string $urlEndpoint;

    public function __construct()
    {
        $this->privateKey = config('services.imagekit.private_key', '');
        $this->urlEndpoint = config('services.imagekit.url_endpoint', '');

        if (empty($this->privateKey)) {
            throw new \Exception('ImageKit private key is missing in config.');
        }
    }

    /**
     * Upload file to ImageKit
     */
    public function upload($file, string $folder = 'companies'): string
    {
        // Guard check for null or invalid file
        if (!$file || !($file instanceof UploadedFile)) {
            throw new \Exception('Invalid or missing file provided for ImageKit upload.');
        }

        try {
            $cleanFolder = '/' . trim($folder, '/');
            $fileName = time() . '_' . preg_replace('/[^A-Za-z0-9\-]/', '', pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));

            $response = Http::withoutVerifying()
                ->withBasicAuth($this->privateKey, '')
                ->attach(
                    'file',
                    file_get_contents($file->getRealPath()),
                    $file->getClientOriginalName()
                )
                ->post('https://upload.imagekit.io/api/v1/files/upload', [
                    'fileName' => $fileName,
                    'folder' => $cleanFolder,
                    'useUniqueFileName' => 'true',
                ]);

            if ($response->failed()) {
                Log::error('ImageKit API Upload Error: ' . $response->body());
                throw new \Exception('ImageKit Upload Failed: ' . ($response->json('message') ?? 'Unknown error'));
            }

            return $response->json('url');
        } catch (\Throwable $e) {
            Log::error('ImageKit Exception: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Delete file from ImageKit by matching URL / file path
     */
    public function deleteByUrl(?string $url): void
    {
        if (empty($url) || !str_starts_with($url, 'http')) {
            return;
        }

        try {
            $fileId = null;

            // Extract path and filename from URL
            $urlPath = parse_url($url, PHP_URL_PATH);

            if (!empty($urlPath)) {
                // Remove ImageKit Endpoint prefix if present (e.g., /your_id)
                $endpointPath = parse_url($this->urlEndpoint, PHP_URL_PATH);
                if (!empty($endpointPath) && str_starts_with($urlPath, $endpointPath)) {
                    $urlPath = substr($urlPath, strlen($endpointPath));
                }

                $fileName = basename($urlPath);
                $folderPath = str_replace('\\', '/', dirname($urlPath));
                if ($folderPath === '.' || $folderPath === '\\') {
                    $folderPath = '/';
                }

                // 1. Search using 'name' parameter (ImageKit API v1)
                $nameSearch = Http::withoutVerifying()
                    ->withBasicAuth($this->privateKey, '')
                    ->get('https://api.imagekit.io/v1/files', [
                        'name' => $fileName,
                    ]);

                if ($nameSearch->successful() && !empty($nameSearch->json())) {
                    foreach ($nameSearch->json() as $item) {
                        if (($item['name'] ?? '') === $fileName || str_ends_with($item['filePath'] ?? '', $fileName)) {
                            $fileId = $item['fileId'];
                            break;
                        }
                    }
                    if (!$fileId && isset($nameSearch->json()[0]['fileId'])) {
                        $fileId = $nameSearch->json()[0]['fileId'];
                    }
                }

                // 2. Fallback: Search using searchQuery
                if (!$fileId) {
                    $searchQueryResponse = Http::withoutVerifying()
                        ->withBasicAuth($this->privateKey, '')
                        ->get('https://api.imagekit.io/v1/files', [
                            'searchQuery' => 'name="' . $fileName . '"',
                        ]);

                    if ($searchQueryResponse->successful() && !empty($searchQueryResponse->json())) {
                        $fileId = $searchQueryResponse->json()[0]['fileId'] ?? null;
                    }
                }

                // 3. Fallback: Search by Folder Path
                if (!$fileId && !empty($folderPath) && $folderPath !== '/') {
                    $folderSearch = Http::withoutVerifying()
                        ->withBasicAuth($this->privateKey, '')
                        ->get('https://api.imagekit.io/v1/files', [
                            'path' => $folderPath,
                        ]);

                    if ($folderSearch->successful() && !empty($folderSearch->json())) {
                        foreach ($folderSearch->json() as $item) {
                            if (($item['name'] ?? '') === $fileName || str_ends_with($item['filePath'] ?? '', $fileName)) {
                                $fileId = $item['fileId'];
                                break;
                            }
                        }
                    }
                }
            }

            // Delete file if fileId was found
            if ($fileId) {
                $deleteResponse = Http::withoutVerifying()
                    ->withBasicAuth($this->privateKey, '')
                    ->delete("https://api.imagekit.io/v1/files/{$fileId}");

                if ($deleteResponse->successful()) {
                    Log::info("ImageKit: Successfully deleted old file (fileId: {$fileId}, URL: {$url})");
                } else {
                    Log::warning("ImageKit: Delete request failed for fileId {$fileId}: " . $deleteResponse->body());
                }
            } else {
                Log::warning("ImageKit: Old file not found on ImageKit for URL: {$url}");
            }
        } catch (\Throwable $e) {
            Log::warning('Failed to delete file from ImageKit: ' . $e->getMessage());
        }
    }
}
