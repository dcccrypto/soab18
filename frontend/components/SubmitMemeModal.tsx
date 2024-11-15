import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { ButtonBase } from '@/components/ui/button-base'

interface SubmitMemeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SubmitMemeModal = ({ isOpen, onClose }: SubmitMemeModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setIsSubmitting(true)
    try {
      // TODO: Implement actual file upload logic here
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated delay
      onClose()
      alert('Meme submitted successfully!')
    } catch (error) {
      alert('Failed to submit meme. Please try again.')
    } finally {
      setIsSubmitting(false)
      setSelectedFile(null)
      setPreview(null)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg bg-neutral-900 rounded-xl p-6 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <ButtonBase
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </ButtonBase>

            <h2 className="text-2xl font-bold mb-6 gradient-text">Submit Your Meme</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div 
                className="relative border-2 border-dashed border-orange-500/30 rounded-lg p-8 hover:border-orange-500/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="Choose meme image"
                />
                
                {preview ? (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={preview}
                      alt="Meme preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="w-12 h-12 mb-4" />
                    <p className="text-center">
                      <span className="text-orange-400">Click to upload</span> or drag and drop<br />
                      PNG, JPG or GIF (max. 5MB)
                    </p>
                  </div>
                )}
              </div>

              <ButtonBase
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={!selectedFile || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Submit Meme
                  </span>
                )}
              </ButtonBase>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 