import React, { useState, useEffect } from 'react';
import { FaUser, FaCamera } from 'react-icons/fa';
import { getCurrentUser, apiUpdateProfile } from '../services/auth';
import Swal from 'sweetalert2';

const UserProfile = ({ theme }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        avatar: null
    });


    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                avatar: user.avatar || null
            });
            if (user.avatar) {
                setPreviewUrl(`https://savefiles.org/secure/uploads/${user.avatar}?shareable_link=509`);
            }
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatar(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updateData = new FormData();
            updateData.append('firstName', formData.firstName);
            updateData.append('lastName', formData.lastName);
            updateData.append('email', formData.email);
            if (avatar) {
                updateData.append('avatar', avatar);
            }

            const response = await apiUpdateProfile(updateData);

            if (response.data) {
                // Update local storage with new user data
                localStorage.setItem('user', JSON.stringify(response.data));
                
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated!',
                    text: 'Your profile has been updated successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.response?.data?.message || 'Failed to update profile. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`max-w-2xl mx-auto p-6 ${theme.formBg} rounded-lg ${theme.textColor}`}>
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-24 h-24 mb-2">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                <FaUser className="text-3xl text-gray-400" />
                            </div>
                        )}
                        <label
                            htmlFor="avatar"
                            className="absolute bottom-0 right-0 bg-orange-600 p-2 rounded-full cursor-pointer hover:bg-orange-700 transition-colors"
                        >
                            <FaCamera className="text-white" />
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <label className="text-sm font-medium">Profile Picture</label>
                </div>

                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
                        required
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full p-2 rounded-lg ${theme.cardBg} ${theme.borderColor} focus:ring-2`}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-lg ${theme.buttonColor} text-white transition-colors disabled:bg-gray-400`}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
