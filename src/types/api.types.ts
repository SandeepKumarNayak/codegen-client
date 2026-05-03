export interface ApiError {
    message: string
    code?: string
    status?: number
}

export interface ApiResponse<T = unknown> {
    data?: T
    error?: ApiError
    ok: boolean
}

export type SSEEventType = 'token' | 'done' | 'error'

export interface SSEEvent {
    type: SSEEventType
    data: string
}

export interface GenerateRequest {
    prompt: string
    framework: string
    styling: string
    currentCode?: string
}
