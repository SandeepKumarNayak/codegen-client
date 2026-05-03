import { apiClient } from './client'
import { ENDPOINTS } from './endpoints'

export interface LoginPayload { email: string; password: string }
export interface AuthResponse { token: string; user: { id: string; email: string } }

export const login = (p: LoginPayload) =>
    apiClient<AuthResponse>(ENDPOINTS.AUTH_LOGIN, { method: 'POST', body: JSON.stringify(p) })

export const logout = () => apiClient(ENDPOINTS.AUTH_LOGOUT, { method: 'POST' })
