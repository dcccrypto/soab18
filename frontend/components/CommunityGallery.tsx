import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PLACEHOLDER_MEMES = Array(8).fill(null).map((_, i) => ({
  id: i + 1,
  title: `Community Meme ${i + 1}`,
  image: '/images/placeholder-meme.jpg'
}));

export const CommunityGallery = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {PLACEHOLDER_MEMES.map((meme) => (
          <motion.div
            key={meme.id}
            whileHover={{ scale: 1.05 }}
            className="aspect-square bg-card rounded-lg overflow-hidden border border-primary/20"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <span className="text-primary/50 text-sm">{meme.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Show More Memes
        </Button>
      </div>
    </div>
  );
}; 