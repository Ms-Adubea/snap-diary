import React from 'react';

const FilePreview = ({ files }) => {
  return (
    <div className="image-preview-grid grid grid-cols-3 gap-2 mt-4">
      {files.map((file, index) => {
        const src = URL.createObjectURL(file);
        return (
          <div key={index} className="relative w-full h-24 overflow-hidden rounded-lg shadow-lg">
            <img src={src} alt="Preview" className="object-cover w-full h-full" />
          </div>
        );
      })}
    </div>
  );
};

export default FilePreview;
