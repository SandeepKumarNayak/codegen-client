export const API_URL = (import.meta.env.VITE_API_URL as string) ?? 'http://localhost:3000'

export const FRAMEWORKS = [
    { id: 'html' as const, label: 'HTML', emoji: '🌐', description: 'Pure HTML/CSS' },
    { id: 'react' as const, label: 'React', emoji: '⚛️', description: 'React + JSX' },
    { id: 'vue' as const, label: 'Vue', emoji: '💚', description: 'Vue 3 SFC' },
    { id: 'vanilla' as const, label: 'Vanilla JS', emoji: '🍦', description: 'Plain JavaScript' },
]

export const STYLING_OPTIONS = [
    { id: 'css' as const, label: 'CSS' },
    { id: 'tailwind' as const, label: 'Tailwind' },
    { id: 'bootstrap' as const, label: 'Bootstrap 5' },
    { id: 'scss' as const, label: 'SCSS' },
    { id: 'none' as const, label: 'None' },
]

export const LS_KEYS = {
    HISTORY: 'cg_history',
    THEME: 'cg_theme',
    LAST_PROMPT: 'cg_last_prompt',
    FRAMEWORK: 'cg_framework',
    STYLING: 'cg_styling',
} as const

export const MAX_HISTORY_ENTRIES = 20
export const SSE_ENDPOINT = `${API_URL}/api/generate`
export const MAX_PROMPT_LENGTH = 2000

export const FRAMEWORK_LANGUAGE_MAP: Record<string, string> = {
    html: 'html',
    react: 'tsx',
    vue: 'html',
    vanilla: 'javascript',
}
