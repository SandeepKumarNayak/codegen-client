import { useHistoryStore } from '@/stores/historyStore'
import { usePromptStore } from '@/stores/promptStore'

export function usePromptHistory() {
    const { entries, addEntry, removeEntry, clearHistory } = useHistoryStore()
    const { setPrompt, setFramework, setStyling } = usePromptStore()

    const loadEntry = (id: string) => {
        const entry = entries.find((e) => e.id === id)
        if (!entry) return
        setPrompt(entry.prompt)
        setFramework(entry.framework)
        setStyling(entry.styling)
    }

    return { entries, addEntry, removeEntry, clearHistory, loadEntry }
}
