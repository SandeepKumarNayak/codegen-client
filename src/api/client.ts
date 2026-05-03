import { API_URL } from '@/utils/constants'

interface RequestOptions extends RequestInit { token?: string }

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { token, ...rest } = options
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(rest.headers as Record<string, string> ?? {}),
    }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${API_URL}${path}`, { ...rest, headers })
    if (!res.ok) {
        const body = await res.json().catch(() => ({ message: `HTTP ${res.status}` }))
        const err = new Error((body as { message?: string }).message ?? `HTTP ${res.status}`) as Error & { status: number }
        err.status = res.status
        throw err
    }
    return res.json() as Promise<T>
}
