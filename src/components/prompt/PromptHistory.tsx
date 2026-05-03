import { usePromptHistory } from '@/hooks/usePromptHistory'

export default function PromptHistory() {
    const { entries, loadEntry, removeEntry, clearHistory } = usePromptHistory()

    if (entries.length === 0) {
        return <p className="text-xs text-gray-400 dark:text-gray-600 text-center p-6">No history yet</p>
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-end px-3 py-2">
                <button onClick={clearHistory} className="text-xs text-gray-400 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    Clear all
                </button>
            </div>
            {entries.map((e) => (
                <div
                    key={e.id}
                    className="group flex items-start gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800/50 cursor-pointer transition-colors"
                    onClick={() => loadEntry(e.id)}
                >
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{e.prompt}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-400 dark:text-gray-600">{e.framework}</span>
                            <span className="text-[10px] text-gray-300 dark:text-gray-700">·</span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-600">{new Date(e.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                    <button
                        onClick={(ev) => { ev.stopPropagation(); removeEntry(e.id) }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 text-xs transition-opacity"
                    >✕</button>
                </div>
            ))}
        </div>
    )
}
