export type Language = 'html' | 'javascript' | 'typescript' | 'css' | 'jsx' | 'tsx'

export interface GeneratedCode {
    content: string
    language: Language
    timestamp: number
}

export interface CodeStats {
    lines: number
    characters: number
    words: number
    estimatedTokens: number
}
