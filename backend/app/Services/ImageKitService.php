<?php

namespace App\Services;

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
     * Delete file from ImageKit by matching URL / file name
     */
    public function deleteByUrl(?string $url): void
    {
        if (empty($url) || !str_starts_with($url, 'http')) {
            return;
        }

        try {
            // Extract exact file name from URL
            $fileName = basename(parse_url($url, PHP_URL_PATH));

            // Search file in ImageKit API
            $searchResponse = Http::withoutVerifying()
                ->withBasicAuth($this->privateKey, '')
                ->get('https://api.imagekit.io/v1/files', [
                    'searchQuery' => 'name = "' . $fileName . '"',
                ]);

            if ($searchResponse->successful()) {
                $results = $searchResponse->json();

                if (!empty($results) && isset($results[0]['fileId'])) {
                    $fileId = $results[0]['fileId'];

                    // Delete file using fileId
                    Http::withoutVerifying()
                        ->withBasicAuth($this->privateKey, '')
                        ->delete("https://api.imagekit.io/v1/files/{$fileId}");
                }
            }
        } catch (\Throwable $e) {
            Log::warning('Failed to delete file from ImageKit: ' . $e->getMessage());
        }
    }
}
