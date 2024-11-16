import { apiClient } from "./config"

export const apiSignup = async (formData) => {
    try {
        console.log('Sending registration data:', formData);
        if (!formData.get('confirmPassword')) {
            throw new Error('Confirm password is required');
        }
        
        const response = await apiClient.post('/users/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Registration response:', response);
        return response;
    } catch (error) {
        console.error('Registration error in service:', error);
        throw error;
    }
}

export const apiLogin = async (credentials) => {
    try {
        const response = await apiClient.post('/users/login', credentials);
        
        if (response.data && response.data.data) {
            const { accessToken, user } = response.data.data;
            // Save token and user data to localStorage
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            // Set token in axios default headers
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return response;
        } else {
            console.error('Response structure:', response.data);
            throw new Error('Invalid token structure in response');
        }
    } catch (error) {
        console.error('Login error details:', error.response?.data);
        throw error;
    }
};

export const apiGetProfile = async (payload) => {
    return await apiClient.get ( '/users/me')
}

export const apiUpdateProfile = async (payload) => {
    return await apiClient.patch ( '/users/me', payload)
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete apiClient.defaults.headers.common['Authorization'];
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

// Get token
export const getToken = () => {
    return localStorage.getItem('token');
};

// Add this function to get user data
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

