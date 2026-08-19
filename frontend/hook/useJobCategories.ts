import { useState, useEffect } from 'react';
import { getJobCategories } from '@/lib/job.api';

export interface JobCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  is_active: boolean;
}

export function useJobCategories() {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getJobCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}