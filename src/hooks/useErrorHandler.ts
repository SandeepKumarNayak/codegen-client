import { useCallback } from 'react'
import { useUIStore } from '@/stores/uiStore'
import { getErrorMessage } from '@/api/errorHandler'

export function useErrorHandler() {
    const showToast = useUIStore((s) => s.showToast)

    const handleError = useCallback((error: unknown, fallback = 'Something went wrong') => {
        const message = getErrorMessage(error) || fallback
        showToast({ type: 'error', message })
        console.error('[ErrorHandler]', error)
    }, [showToast])

    return { handleError }
}
