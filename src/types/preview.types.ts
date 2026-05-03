export type LogLevel = 'log' | 'warn' | 'error' | 'info'

export interface ConsoleLog {
    id: string
    level: LogLevel
    message: string
    timestamp: number
}

export interface PreviewResult {
    blobUrl: string | null
    error: string | null
}
