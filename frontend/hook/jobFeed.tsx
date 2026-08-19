import { useState, useEffect } from 'react';
import axios from 'axios';
import { getJobs as fetchJobsApi } from '@/lib/job.api';

export interface Job {
    id: number;
    title: string;
    job_type: string;
    salary: string;
    company_name: string;
    company_logo: string;
    location: string;
    category_id: number;
    is_active: boolean;
}

export function useJobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
             const data: Job[] = await fetchJobsApi();
            setJobs(data);
        } catch (err: unknown) {
            const message = axios.isAxiosError<{ message?: string }>(err)
                ? err.response?.data?.message ?? err.message
                : err instanceof Error
                    ? err.message
                    : 'Error fetching jobs';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void Promise.resolve().then(fetchJobs);
    }, []);

    return { jobs, loading, error, refetchJobs: fetchJobs };
}
