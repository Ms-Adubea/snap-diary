import { apiClient } from "./config"

export const apiGetPhotos = async () => {
    return await apiClient.get ( '/photos' )
}
export const apiGetPhoto = async () => {
    return await apiClient.get('/photos/:id')
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
export const apiEditPhotos = async () => {
    return await apiClient.patch('/photos/:id')
}
export const apiDeletePhoto = async () => {
    return await apiClient.delete('/photos/:id')
}
export const apiCountPhotos = async () => {
    return await apiClient.get ('/photos/count')
}
