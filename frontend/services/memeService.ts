import { API_ENDPOINTS } from '@/config/api';

export interface Meme {
  _id: string;
  url: string;
  pathname: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadDate: string;
}

export interface MemeResponse {
  success: boolean;
  message?: string;
  data?: {
    url: string;
    pathname: string;
  };
  error?: string;
}

export interface GetMemesResponse {
  success: boolean;
  data?: Meme[];
  error?: string;
}

export const uploadMeme = async (file: File): Promise<MemeResponse> => {
  try {
    const formData = new FormData();
    formData.append('meme', file);

    const response = await fetch(API_ENDPOINTS.MEMES.UPLOAD, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Upload failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading meme:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload meme'
    };
  }
};

export const getMemes = async (): Promise<GetMemesResponse> => {
  try {
    console.log('Fetching memes from:', API_ENDPOINTS.MEMES.GET_ALL);
    const response = await fetch(API_ENDPOINTS.MEMES.GET_ALL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch memes: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received memes:', data);
    return data;
  } catch (error) {
    console.error('Error fetching memes:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch memes'
    };
  }
};
