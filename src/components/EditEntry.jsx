import React, { useState, useEffect } from 'react';
import { FaImage, FaStar, FaTimes } from 'react-icons/fa';
import { apiUpdatePhoto } from '../services/photo';
import Swal from 'sweetalert2';

const EditEntry = ({ entry, onClose, onUpdate, theme }) => {
    const [title, setTitle] = useState(entry.title);
    const [description, setDescription] = useState(entry.description);
    const [isFavorite, setIsFavorite] = useState(entry.isFavorite);
    const [loading, setLoading] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setNewImages(prevImages => [...prevImages, ...files]);
        setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('isFavorite', isFavorite);
            newImages.forEach(image => {
                formData.append('images', image);
            });

            const response = await apiUpdatePhoto(entry.id, formData);
            
            Swal.fire({
                icon: 'success',
                title: 'Entry Updated!',
                showConfirmButton: false,
                timer: 1500
            });

            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error('Error updating entry:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update entry'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${theme.cardBg} max-w-2xl w-full mx-4 rounded-lg shadow-xl p-6`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Edit Entry</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full p-2 rounded-lg ${theme.borderColor} focus:ring-2`}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full p-2 rounded-lg h-32 ${theme.borderColor} focus:ring-2`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Add More Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="edit-image-upload"
                        />
                        <label
                            htmlFor="edit-image-upload"
                            className={`cursor-pointer flex items-center justify-center p-4 border-2 border-dashed ${theme.borderColor} rounded-lg`}
                        >
                            <FaImage className="mr-2" /> Choose Images
                        </label>
                    </div>

                    {/* Existing Images */}
                    <div className="grid grid-cols-3 gap-4">
                        {entry.images?.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image.url}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>

                    {/* New Images Preview */}
                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={url}
                                        alt={`New Image ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={`p-2 rounded-full transition-colors ${
                                isFavorite ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                        >
                            <FaStar className="text-xl" />
                        </button>
                        <span className="ml-2 text-sm">
                            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        </span>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 ${theme.buttonColor} text-white rounded-lg`}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEntry; 