// src/components/auth/forms/ProfilePhotoUpload.jsx
import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../utils/imageUtils';

const ProfilePhotoUpload = ({ 
  imagePreview, 
  setImagePreview, 
  onImageChange,
  error = ''
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      onImageChange({ error: 'File size must be less than 5MB' });
      return;
    }

    if (!file.type.startsWith('image/')) {
      onImageChange({ error: 'Please upload an image file' });
      return;
    }

    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageToCrop(e.target.result);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
  //       imageToCrop,
        croppedAreaPixels
      );
      
      setImagePreview(croppedImage);
      onImageChange({ file: croppedImage, preview: croppedImage });
      setShowCropModal(false);
      setImageToCrop(null);
    } catch (e) {
      console.error('Error cropping image:', e);
      onImageChange({ error: 'Failed to crop image' });
    }
  }, [imageToCrop, croppedAreaPixels, setImagePreview, onImageChange]);

  const removeProfilePhoto = () => {
    setImagePreview(null);
    setSelectedFile(null);
    onImageChange({ file: null, preview: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cancelCrop = () => {
    setShowCropModal(false);
    setImageToCrop(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        id="profileUpload"
        ref={fileInputRef}
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
      />

      {/* Profile Photo Display */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <i className="fas fa-user text-5xl text-gray-400"></i>
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 flex gap-2">
            <button
              type="button"
              onClick={triggerFileInput}
              className="w-10 h-10 bg-[#9F7539] rounded-full flex items-center justify-center hover:bg-[#b58a4a] transition-colors shadow-md"
            >
              <i className="fas fa-upload text-white text-sm"></i>
            </button>
            {imagePreview && (
              <button
                type="button"
                onClick={removeProfilePhoto}
                className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
              >
                <i className="fas fa-trash text-white text-sm"></i>
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={triggerFileInput}
            className="text-[#9F7539] hover:underline font-medium"
          >
            {imagePreview ? "Change profile photo" : "Upload profile photo"}
          </button>
          <p className="text-sm text-gray-500 mt-1">
            JPG, PNG or GIF (max. 5MB)
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Optional - you can skip and add later
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">
          {error}
        </p>
      )}

      {/* Crop Modal */}
      {showCropModal && imageToCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Crop Profile Photo
                </h3>
                <button
                  onClick={cancelCrop}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>

              <div className="mb-6">
                <div className="relative h-64 w-full bg-gray-900 rounded-lg overflow-hidden">
                  <Cropper
                    image={imageToCrop}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    cropShape="round"
                    showGrid={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <i className="fas fa-crop-alt text-4xl mb-2"></i>
                      <p>Crop functionality will be enabled</p>
                      <p className="text-sm">when react-easy-crop is uncommented</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Zoom:</span>
                    <input
                      type="range"
                      // value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      // onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={cancelCrop}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  // onClick={showCroppedImage}
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