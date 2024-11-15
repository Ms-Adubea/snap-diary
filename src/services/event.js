import { apiClient } from "./config"

export const apiGetEvents = async () => {
    return await apiClient.get('/events')
}
export const apiGetEvent = async (id) => {
    return await apiClient.get(`/events/${id}`)
}
export const apiCreateEvent = async (eventData) => {
    try {
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