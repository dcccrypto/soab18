import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { ButtonBase } from '@/components/ui/button-base';
import { MEME_IMAGES } from '@/constants';
import { useMemes } from '@/hooks/useMemes';

interface MemeGalleryProps {
  onSubmitClick: () => void;
}

export function MemeGallery({ onSubmitClick }: MemeGalleryProps) {
  const { memes, isLoading, error } = useMemes();

  // Combine static and uploaded memes
  const allMemes = [
    ...Object.entries(MEME_IMAGES).map(([key, path]) => ({
      id: key,
      url: path,
      isStatic: true
    })),
    ...(memes || []).map(meme => ({
      id: meme.id,
      url: meme.url,
      isStatic: false
    }))
  ];

  return (
    <div className="relative group">
      <div className="overflow-x-auto overflow-y-hidden scrollbar-none">
        <div className="flex gap-4 md:gap-6 pb-4 min-w-full">
          {allMemes.map((meme) => (
            <motion.div
              key={meme.id}
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0 w-[280px] md:w-[320px] aspect-square rounded-xl overflow-hidden bg-neutral-900/50 border border-orange-500/20"
            >
              <div className="relative w-full h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5" />
                <Image
                  src={meme.url}
                  alt={`Community Meme ${meme.id}`}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300 flex items-center justify-center">
                  <ButtonBase
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-orange-400 transition-colors duration-300"
                    onClick={() => window.open(meme.url, '_blank')}
                    aria-label="View meme in full size"
                  >
                    View Full Size
                  </ButtonBase>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ButtonBase
          variant="ghost"
          size="sm"
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
          onClick={() => {
            const container = document.querySelector('.overflow-x-auto');
            if (container) {
              container.scrollBy({ left: -340, behavior: 'smooth' });
            }
          }}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </ButtonBase>
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ButtonBase
          variant="ghost"
          size="sm"
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
          onClick={() => {
            const container = document.querySelector('.overflow-x-auto');
            if (container) {
              container.scrollBy({ left: 340, behavior: 'smooth' });
            }
          }}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </ButtonBase>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <ButtonBase
          variant="default"
          size="lg"
          className="group relative overflow-hidden"
          onClick={onSubmitClick}
        >
          <span className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Submit Your Meme
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </ButtonBase>
        <p className="text-sm text-gray-400/90">
          Share your creativity with the $SOBA community!
        </p>
      </div>
    </div>
  );
}
