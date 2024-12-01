import React, { useState, useRef, ChangeEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { memeService } from '@/services/memeService';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface SubmitMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface MemeResponse {
  success: boolean;
  message?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export const SubmitMemeModal: React.FC<SubmitMemeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error('Only JPEG, PNG, and GIF files are allowed');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    try {
      const response: MemeResponse = await memeService.uploadMeme(selectedFile);
      if (response.success) {
        toast.success('Meme uploaded successfully!');
        onSuccess?.();
        onClose();
      } else {
        toast.error(response.message || 'Failed to upload meme');
      }
    } catch (error) {
      toast.error('Failed to upload meme');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white mb-4"
                >
                  Submit Your Meme
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={ALLOWED_FILE_TYPES.join(',')}
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-orange-400 file:text-neutral-900
                      hover:file:bg-orange-500
                      file:cursor-pointer cursor-pointer"
                  />
                </div>

                {previewUrl && (
                  <div className="mt-4 relative aspect-video">
                    <Image
                      src={previewUrl}
                      alt="Meme preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                )}

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                    disabled={!selectedFile || isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
