import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SubmitMemeModal } from './SubmitMemeModal';
import { getMemes, type Meme } from '@/services/memeService';
import Image from 'next/image';
import { Upload } from 'lucide-react';

export const CommunityGallery = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(8);

  const fetchMemes = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching memes...');
      const response = await getMemes();
      console.log('Memes response:', response);
      if (response.success && response.data) {
        console.log('Setting memes:', response.data);
        setMemes(response.data);
      } else {
        console.error('Failed to fetch memes:', response);
      }
    } catch (error) {
      console.error('Error fetching memes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('CommunityGallery mounted');
    fetchMemes();
  }, []);

  const handleSubmitSuccess = () => {
    console.log('Meme submitted successfully, refreshing gallery...');
    fetchMemes();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Community Gallery</h2>
        <p className="text-gray-400 mb-8">Share your creativity with the $SOBA community!</p>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          Submit Meme
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : memes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No memes yet. Be the first to submit one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {memes.slice(0, displayCount).map((meme) => (
              <motion.div
                key={meme._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative group aspect-square rounded-lg overflow-hidden bg-gray-800"
              >
                <Image
                  src={meme.url}
                  alt={meme.originalName}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {memes.length > displayCount && (
        <div className="text-center mt-8">
          <Button
            onClick={() => setDisplayCount(prev => prev + 8)}
            variant="outline"
            className="hover:bg-purple-600 hover:text-white transition-colors"
          >
            Load More
          </Button>
        </div>
      )}

      <SubmitMemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSubmitSuccess}
      />
    </div>
  );
};