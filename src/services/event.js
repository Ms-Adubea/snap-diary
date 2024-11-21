import { apiClient } from "./config"

export const apiGetEvents = async () => {
    try {
        const response = await apiClient.get('/users/me/events')
        console.log('Events response:', response)
        return response
    } catch (error) {
        throw error
    }
}
export const apiCountEvents = async () => {
    return await apiClient.get('/events/count')
}
export const apiGetEvent = async (id) => {
    return await apiClient.get(`/events/${id}`)
}
export const apiCreateEvent = async (eventData) => {
    try {
        console.log('Creating event with data:', eventData)
        const response = await apiClient.post('/events', eventData)
        return response
    } catch (error) {
        throw error
    }
}
export const apiUpdateEvent = async (id, eventData) => {
    return await apiClient.patch(`/events/${id}`, eventData)
}
export const apiDeleteEvent = async (id) => {
    return await apiClient.delete(`/events/${id}`)
}
export const apiToggleEventFavorite = async (id) => {
    return await apiClient.patch(`/events/${id}/favorite`)
}
export const apiGetFavoriteEvents = async () => {
    return await apiClient.get('/events/favorites')
}