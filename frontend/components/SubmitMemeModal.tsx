import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { uploadMeme } from '@/services/memeService';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface SubmitMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function SubmitMemeModal({ isOpen, onClose, onSuccess }: SubmitMemeModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!fileInputRef.current?.files?.length) {
      toast.error('Please select a file to upload');
      return;
    }

    const file = fileInputRef.current.files[0];
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Uploading meme...');
    
    try {
      console.log('Uploading meme...');
      const response = await uploadMeme(file);
      console.log('Upload response:', response);
      
      if (response.success && response.data) {
        toast.success('Meme uploaded successfully!', { id: toastId });
        console.log('Calling onSuccess callback...');
        onSuccess?.();
        handleClose();
      } else {
        throw new Error(response.error || 'Failed to upload meme');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload meme', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      fileInputRef.current.files = event.dataTransfer.files;
      handleFileChange({ target: { files: event.dataTransfer.files } } as any);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Submit Your Meme</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className="border-2 border-dashed border-orange-400 rounded-lg p-8 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {previewUrl ? (
              <div className="relative w-full aspect-video">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <>
                <div className="mx-auto w-16 h-16 mb-4">
                  <Image
                    src="/icons/upload.svg"
                    alt="Upload"
                    width={64}
                    height={64}
                  />
                </div>
                <p className="text-orange-400 font-medium">Click to upload</p>
                <p className="text-gray-400">or drag and drop</p>
                <p className="text-sm text-gray-400 mt-2">PNG, JPG or GIF (max. 5MB)</p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="submit"
            disabled={isUploading || !previewUrl}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Submit Meme'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}