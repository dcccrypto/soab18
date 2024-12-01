import { useState, useEffect } from 'react';
import { memeService, type Meme } from '@/services/memeService';
import { toast } from 'react-hot-toast';

export function useMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemes = async () => {
    try {
      setIsLoading(true);
      const response = await memeService.getMemes();
      if (response.success && response.data) {
        setMemes(response.data);
      } else {
        setError(response.message || 'Failed to load memes');
        toast.error('Failed to load memes');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch memes');
      toast.error('Failed to load memes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  const refreshMemes = () => {
    fetchMemes();
  };

  return {
    memes,
    isLoading,
    error,
    refreshMemes
  };
}
