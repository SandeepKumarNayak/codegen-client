import { useState } from 'react'
import { usePreviewStore } from '@/stores/previewStore'
import ErrorBoundary from './ErrorBoundary'
import PreviewFrame from './PreviewFrame'
import ConsoleOutput from './ConsoleOutput'
import PreviewLoader from './PreviewLoader'
import { usePreviewExecution } from '@/hooks/usePreviewExecution'

type Tab = 'preview' | 'console'

export default function PreviewPanel() {
    usePreviewExecution()
    const [tab, setTab] = useState<Tab>('preview')
    const { isLoading, logs, blobUrl, reset } = usePreviewStore()
    const errorCount = logs.filter((l) => l.level === 'error').length

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 flex-shrink-0">
                {(['preview', 'console'] as Tab[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${tab === t
                                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-700'
                                : 'text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                            }`}
                    >
                        {t}
                        {t === 'console' && errorCount > 0 && (
                            <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 rounded-full">{errorCount}</span>
                        )}
                    </button>
                ))}

                <div className="ml-auto flex items-center gap-2">
                    {blobUrl && (
                        <button
                            onClick={() => window.open(blobUrl, '_blank')}
                            className="text-xs px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-300 dark:hover:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 transition-all flex items-center gap-1.5 font-medium"
                            title="Expand to new tab"
                        >
                            <span>↗</span>
                            <span>Expand</span>
                        </button>
                    )}
                    <button
                        onClick={() => reset()}
                        className="text-xs text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors p-1"
                        title="Reset Preview"
                    >
                        ↺
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-hidden bg-white dark:bg-gray-950">
                {isLoading ? <PreviewLoader /> : (
                    tab === 'preview'
                        ? <ErrorBoundary><PreviewFrame /></ErrorBoundary>
                        : <ConsoleOutput />
                )}
            </div>
        </div>
    )
}
