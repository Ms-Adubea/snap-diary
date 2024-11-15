import { apiClient } from "./config"

export const apiSignup = async (payload) => {
    return await apiClient.post ( '/users/register', payload)
}
export const apiLogin = async (payload) => {
    return await apiClient.post ( '/users/login', payload)
}
export const apiGetProfile = async (payload) => {
    return await apiClient.get ( '/users/me')
}
export const apiUpdateProfile = async (payload) => {
    return await apiClient.patch ( '/users/me', payload)
}

