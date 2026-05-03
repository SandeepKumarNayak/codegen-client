import { useEffect, useRef } from 'react'
import { useCodeStore } from '@/stores/codeStore'
import { usePreviewStore } from '@/stores/previewStore'
import { usePromptStore } from '@/stores/promptStore'
import { executeCode } from '@/utils/previewExecutor'

export function usePreviewExecution() {
    const isGenerating = useCodeStore((s) => s.isGenerating)
    const executePreview = usePreviewStore((s) => s.executePreview)
    const prevIsGenerating = useRef(isGenerating)

    useEffect(() => {
        // Auto-run preview only when AI generation finishes
        if (prevIsGenerating.current === true && isGenerating === false) {
            executePreview()
        }
        prevIsGenerating.current = isGenerating
    }, [isGenerating, executePreview])
}
