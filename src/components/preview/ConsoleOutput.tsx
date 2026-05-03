import { usePreviewStore } from '@/stores/previewStore'
import type { LogLevel } from '@/types'

const colors: Record<LogLevel, string> = {
    log: 'text-gray-700 dark:text-gray-300',
    info: 'text-blue-600 dark:text-blue-400',
    warn: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
}
const icons: Record<LogLevel, string> = { log: '›', info: 'ℹ', warn: '⚠', error: '✕' }

export default function ConsoleOutput() {
    const { logs, clearLogs } = usePreviewStore()
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
                <span className="text-xs text-gray-500">Console ({logs.length})</span>
                <button onClick={clearLogs} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Clear</button>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-xs p-2 space-y-0.5 bg-white dark:bg-gray-950">
                {logs.length === 0 ? (
                    <p className="text-gray-400 dark:text-gray-700 p-2">No console output</p>
                ) : (
                    logs.map((l) => (
                        <div key={l.id} className={`flex gap-2 px-2 py-0.5 rounded hover:bg-gray-50 dark:hover:bg-gray-900/50 ${colors[l.level]}`}>
                            <span className="opacity-60 mt-0.5">{icons[l.level]}</span>
                            <span className="break-all">{l.message}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
