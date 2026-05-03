import { useState } from 'react'
import { useCodeStore } from '@/stores/codeStore'

export default function CopyButton() {
    const code = useCodeStore((s) => s.code)
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        if (!code) return
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={copy}
            disabled={!code}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-transparent transition-all disabled:opacity-40"
        >
            {copied ? '✓ Copied!' : '⎘ Copy'}
        </button>
    )
}
