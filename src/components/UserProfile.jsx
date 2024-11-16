import React, { useState } from 'react';
import { FaUser, FaCamera } from 'react-icons/fa';

const UserProfile = ({ user = {}, onUpdateProfile, theme }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        avatar: user.avatar || ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile(formData);
        setIsEditing(false);
    };

    if (!user) {
        return <div className="text-red-500">User data is not available.</div>;
    }

    return (
        <div className={`p-6 ${theme.cardBg} rounded-lg shadow-md`}>
            {!isEditing ? (
                <div className="flex items-center gap-6">
                    <div className="relative">
                        {formData.avatar ? (
                            <img 
                                src={formData.avatar} 
                                alt="Profile" 
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className={`w-24 h-24 rounded-full ${theme.bgColor} flex items-center justify-center`}>
                                <FaUser className="text-3xl opacity-50" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{formData.firstName} {formData.lastName}</h2>
                        <p className="opacity-75">{formData.email}</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col gap-4">
                        <div className="relative mx-auto">
                            {formData.avatar ? (
                                <img 
                                    src={formData.avatar} 
                                    alt="Profile" 
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className={`w-24 h-24 rounded-full ${theme.bgColor} flex items-center justify-center`}>
                                    <FaUser className="text-3xl opacity-50" />
                                </div>
                            )}
                            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                <FaCamera className="text-white" />
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                    className="hidden" 
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input 
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input 
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
            
            <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`mt-4 px-4 py-2 ${theme.buttonColor} text-white rounded-lg transition-colors`}
            >
                {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
        </div>
    );
};

export default UserProfile;
