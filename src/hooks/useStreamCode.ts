import { useRef, useCallback } from 'react'
import { useCodeStore } from '@/stores/codeStore'
import { streamCode } from '@/api/codeGenerator'
import type { GenerateRequest } from '@/types'

export function useStreamCode() {
    const abortRef = useRef<(() => void) | null>(null)
    const { appendCode, stopGenerating } = useCodeStore()

    const start = useCallback(
        (payload: GenerateRequest, onDone: () => void, onError: (e: Error) => void) => {
            abortRef.current?.()
            abortRef.current = streamCode(payload, appendCode, () => { stopGenerating(); onDone() }, (e) => { stopGenerating(); onError(e) })
        },
        [appendCode, stopGenerating]
    )

    const stop = useCallback(() => { abortRef.current?.(); stopGenerating() }, [stopGenerating])

    return { start, stop }
}
