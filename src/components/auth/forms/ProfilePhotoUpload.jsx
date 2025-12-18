// src/components/auth/forms/ProfilePhotoUpload.jsx
import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/imageUtils';

const ProfilePhotoUpload = ({ 
  image = null, 
  onImageChange,
  error = ''
}) => {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // Handle file size error
      if (typeof onImageChange === 'function') {
        onImageChange(null, "File size must be less than 5MB");
      }
      return;
    }

    if (!file.type.startsWith('image/')) {
      // Handle invalid file type
      if (typeof onImageChange === 'function') {
        onImageChange(null, "Please upload an image file");
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageToCrop(event.target.result);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageToCrop,
        croppedAreaPixels
      );
      
      // Convert data URL to file
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], `profile-${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      if (typeof onImageChange === 'function') {
        onImageChange(file, null);
      }
      
      setCropModalOpen(false);
      setImageToCrop(null);
    } catch (error) {
      console.error('Error cropping image:', error);
      if (typeof onImageChange === 'function') {
        onImageChange(null, "Failed to crop image");
      }
    }
  }, [imageToCrop, croppedAreaPixels, onImageChange]);

  const handleRemovePhoto = () => {
    if (typeof onImageChange === 'function') {
      onImageChange(null, null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Profile photo display and controls */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
            {image ? (
              <img
                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <i className="fas fa-user text-4xl text-gray-400"></i>
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 bg-[#9F7539] rounded-full flex items-center justify-center hover:bg-[#b58a4a] transition-colors shadow-md"
              title="Upload photo"
            >
              <i className="fas fa-camera text-white text-sm"></i>
            </button>
            {image && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                title="Remove photo"
              >
                <i className="fas fa-trash text-white text-sm"></i>
              </button>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[#9F7539] hover:underline font-medium"
          >
            {image ? "Change profile photo" : "Upload profile photo"}
          </button>
          <p className="text-sm text-gray-500 mt-1">
            JPG, PNG or GIF (max. 5MB)
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}

      {/* Crop Modal */}
      {cropModalOpen && imageToCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Crop Profile Photo
                </h3>
                <button
                  onClick={() => {
                    setCropModalOpen(false);
                    setImageToCrop(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>

              <div className="mb-6" style={{ position: 'relative', height: '300px' }}>
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="round"
                  showGrid={false}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zoom: {zoom.toFixed(2)}x
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCropModalOpen(false);
                    setImageToCrop(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCropSave}
                  className="px-4 py-2 bg-[#9F7539] text-white rounded-lg hover:bg-[#b58a4a]"
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePhotoUpload;