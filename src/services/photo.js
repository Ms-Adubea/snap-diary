import { apiClient } from "./config"

// export const apiGetPhotos = async () => {
//     return await apiClient.get ( '/photos' )
// }
export const apiGetUserPhotos = async () => {
    return await apiClient.get('/users/me/photos' )
}
export const apiGetPhoto = async (id) => {
    return await apiClient.get(`/photos/${id}`)
}
export const apiPostPhotos = async (formData) => {
    try {
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
    return await apiClient.patch(`/photos/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
export const apiDeletePhoto = async (id) => {
    return await apiClient.delete(`/photos/${id}`)
}
// export const apiDeletePhoto = async (id) => {
//     return await apiClient.delete(`/users/me/photos/${id}`)
// }
export const apiToggleFavorite = async (id) => {
    return await apiClient.patch(`/photos/${id}/favorite`)
}
export const apiCountPhotos = async () => {
    return await apiClient.get ('/photos/count')
}
export const apiGetFavoritePhotos = async () => {
    return await apiClient.get('/photos/favorites')
}
