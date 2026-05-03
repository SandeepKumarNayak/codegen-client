import { useCallback } from 'react'
import { useCodeStore } from '@/stores/codeStore'
import { usePromptStore } from '@/stores/promptStore'
import { useUIStore } from '@/stores/uiStore'
import { useHistoryStore } from '@/stores/historyStore'
import { useStreamCode } from './useStreamCode'
import { getLanguageFromFramework } from '@/utils/codeFormatter'
import type { Language } from '@/types'

export function useCodeGeneration() {
    const { prompt, framework, styling } = usePromptStore()
    const { startGenerating, setLanguage } = useCodeStore()
    const { showToast } = useUIStore()
    const { addEntry } = useHistoryStore()
    const { start, stop } = useStreamCode()
    const isGenerating = useCodeStore((s) => s.isGenerating)

    const generate = useCallback(() => {
        if (!prompt.trim()) { showToast({ type: 'warning', message: 'Please enter a prompt' }); return }
        const currentCode = useCodeStore.getState().code
        setLanguage(getLanguageFromFramework(framework) as Language)
        startGenerating()
        start(
            { prompt, framework, styling, currentCode: currentCode || undefined },
            () => {
                addEntry({ prompt, framework, styling })
                showToast({ type: 'success', message: 'Code generated!' })
            },
            (e) => showToast({ type: 'error', message: e.message }),
        )
    }, [prompt, framework, styling, startGenerating, setLanguage, start, addEntry, showToast])

    return { generate, stop, isGenerating }
}
