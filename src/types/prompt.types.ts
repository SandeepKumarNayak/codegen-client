export type Framework = 'html' | 'react' | 'vue' | 'vanilla'
export type StylingOption = 'css' | 'tailwind' | 'bootstrap' | 'scss' | 'none'

export interface PromptPayload {
    prompt: string
    framework: Framework
    styling: StylingOption
}

export interface PromptHistoryEntry {
    id: string
    prompt: string
    framework: Framework
    styling: StylingOption
    timestamp: number
    codePreview?: string
}
