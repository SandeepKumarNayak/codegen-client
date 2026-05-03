import { useCodeStore } from '@/stores/codeStore'

export default function CodeStats() {
    const code = useCodeStore((s) => s.code)
    const lines = code ? code.split('\n').length : 0
    const chars = code.length
    const tokens = Math.ceil(chars / 4)

    return (
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-600 px-2">
            <span>{lines} lines</span>
            <span>·</span>
            <span>{chars} chars</span>
            <span>·</span>
            <span>~{tokens} tokens</span>
        </div>
    )
}
