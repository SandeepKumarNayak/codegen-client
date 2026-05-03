import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { PromptHistoryEntry, Framework, StylingOption } from '@/types'
import { lsGet, lsSet } from '@/utils/localStorageManager'
import { LS_KEYS, MAX_HISTORY_ENTRIES } from '@/utils/constants'

interface HistoryState {
    entries: PromptHistoryEntry[]
    addEntry: (e: { prompt: string; framework: Framework; styling: StylingOption; codePreview?: string }) => void
    removeEntry: (id: string) => void
    clearHistory: () => void
}

export const useHistoryStore = create<HistoryState>()(
    devtools((set) => ({
        entries: lsGet<PromptHistoryEntry[]>(LS_KEYS.HISTORY, []),
        addEntry: (entry) =>
            set((s) => {
                const newEntry: PromptHistoryEntry = { ...entry, id: crypto.randomUUID(), timestamp: Date.now() }
                const entries = [newEntry, ...s.entries].slice(0, MAX_HISTORY_ENTRIES)
                lsSet(LS_KEYS.HISTORY, entries)
                return { entries }
            }),
        removeEntry: (id) =>
            set((s) => {
                const entries = s.entries.filter((e) => e.id !== id)
                lsSet(LS_KEYS.HISTORY, entries)
                return { entries }
            }),
        clearHistory: () => { lsSet(LS_KEYS.HISTORY, []); set({ entries: [] }) },
    }), { name: 'HistoryStore' })
)
