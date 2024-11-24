import { apiClient } from "./config"

export const apiGetUserPhotos = async () => {
    return await apiClient.get('/users/me/photos')
}
// export const apiGetPhotos = async () => {
//     return await apiClient.get('/photos')
// }

export const apiGetPhoto = async (id) => {
    return await apiClient.get(`/photos/${id}`)
}

export const apiPostPhotos = async (formData) => {
    try {
        if (formData.has('isFavorite')) {
            formData.delete('isFavorite');
        }

        const response = await apiClient.post('/photos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const apiUpdatePhoto = async (id, formData) => {
    try {
        const response = await apiClient.patch(`/photos/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Update error:', error);
        throw error;
    }
}

export const apiDeletePhoto = async (id) => {
    return await apiClient.delete(`/users/me/photos/${id}`)
}

export const apiCountPhotos = async () => {
    return await apiClient.get('/photos/count')
}

export const apiGetFavoritePhotos = async () => {
    try {
        const response = await apiClient.get('/photos/favorites');
        const favoriteIds = response.data.map(photo => photo.id);
        saveFavoritesToStorage(favoriteIds);
        return response;
    } catch (error) {
        throw error;
    }
};

const getFavoritesFromStorage = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

const saveFavoritesToStorage = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const apiPostFavorite = async (id) => {
    try {
        const response = await apiClient.post(`/photos/${id}/favorite`);
        const favorites = getFavoritesFromStorage();
        if (!favorites.includes(id)) {
            favorites.push(id);
            saveFavoritesToStorage(favorites);
        }
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiRemoveFavorite = async (id) => {
    try {
        const response = await apiClient.delete(`/photos/${id}/favorite`);
        const favorites = getFavoritesFromStorage();
        const updatedFavorites = favorites.filter(favoriteId => favoriteId !== id);
        saveFavoritesToStorage(updatedFavorites);
        return response;
    } catch (error) {
        throw error;
    }
};

export const isEntryFavorited = (id) => {
    const favorites = getFavoritesFromStorage();
    return favorites.includes(id);
};
