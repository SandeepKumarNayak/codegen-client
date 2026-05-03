import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ConsoleLog, LogLevel } from '@/types'
import { useCodeStore } from './codeStore'
import { usePromptStore } from './promptStore'
import { executeCode } from '@/utils/previewExecutor'

interface PreviewState {
    blobUrl: string | null
    error: string | null
    logs: ConsoleLog[]
    isLoading: boolean
    setOutput: (url: string) => void
    setError: (e: string | null) => void
    addLog: (level: LogLevel, message: string) => void
    clearLogs: () => void
    setLoading: (l: boolean) => void
    reset: () => void
    executePreview: () => void
}

export const usePreviewStore = create<PreviewState>()(
    devtools((set) => ({
        blobUrl: null, error: null, logs: [], isLoading: false,
        setOutput: (blobUrl) => set({ blobUrl, error: null }),
        setError: (error) => set({ error }),
        addLog: (level, message) =>
            set((s) => ({ logs: [...s.logs, { id: crypto.randomUUID(), level, message, timestamp: Date.now() }].slice(-200) })),
        clearLogs: () => set({ logs: [] }),
        setLoading: (isLoading) => set({ isLoading }),
        reset: () => set({ blobUrl: null, error: null, logs: [], isLoading: false }),
        executePreview: async () => {
            const { code, language } = useCodeStore.getState();
            const { styling } = usePromptStore.getState();
            if (!code.trim()) return;
            
            set({ isLoading: true });
            // Small timeout to allow UI to show loading state
            setTimeout(() => {
                const result = executeCode(code, language, styling);
                set((state) => {
                    if (state.blobUrl) URL.revokeObjectURL(state.blobUrl);
                    return {
                        blobUrl: result.blobUrl,
                        error: result.blobUrl ? null : (result.error ?? 'Execution failed'),
                        isLoading: false
                    };
                });
            }, 50);
        }
    }), { name: 'PreviewStore' })
)
