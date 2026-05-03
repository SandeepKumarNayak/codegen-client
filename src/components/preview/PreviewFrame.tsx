import { useEffect } from 'react'
import { usePreviewStore } from '@/stores/previewStore'
import type { LogLevel } from '@/types'

interface ConsoleMessage { type: 'console'; level: LogLevel; message: string }

export default function PreviewFrame() {
    const { blobUrl, error, addLog } = usePreviewStore()

    useEffect(() => {
        const handler = (e: MessageEvent) => {
            if (e.data?.type === 'console') {
                const { level, message } = e.data as ConsoleMessage
                addLog(level, message)
            }
        }
        window.addEventListener('message', handler)
        return () => window.removeEventListener('message', handler)
    }, [addLog])

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-red-400 p-6">
                <span className="text-3xl">⚠️</span>
                <p className="text-sm font-medium">Preview Error</p>
                <p className="text-xs text-red-500 text-center font-mono">{error}</p>
            </div>
        )
    }

    if (!blobUrl) {
        return (
            <div className="flex items-center justify-center h-full text-gray-700 text-sm">
                Preview will appear here after generation
            </div>
        )
    }

    return (
        <iframe
            key={blobUrl}
            src={blobUrl}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-modals allow-forms"
            title="Live Preview"
        />
    )
}
