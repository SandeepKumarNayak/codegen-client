import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Language } from '@/types'

interface CodeState {
    code: string
    language: Language
    isGenerating: boolean
    setCode: (code: string) => void
    appendCode: (chunk: string) => void
    setLanguage: (lang: Language) => void
    startGenerating: () => void
    stopGenerating: () => void
    resetCode: () => void
}

export const useCodeStore = create<CodeState>()(
    devtools((set) => ({
        code: '',
        language: 'html',
        isGenerating: false,
        setCode: (code) => set({ code }),
        appendCode: (chunk) => set((s) => ({ code: s.code + chunk })),
        setLanguage: (language) => set({ language }),
        startGenerating: () => set({ isGenerating: true, code: '' }),
        stopGenerating: () => set({ isGenerating: false }),
        resetCode: () => set({ code: '', isGenerating: false }),
    }), { name: 'CodeStore' })
)
