import { createSSEConnection } from '@/utils/eventSource'
import type { OnToken, OnDone, OnError } from '@/utils/eventSource'
import { API_URL } from '@/utils/constants'
import { ENDPOINTS } from './endpoints'
import type { GenerateRequest } from '@/types'

export function streamCode(
    payload: GenerateRequest,
    onToken: OnToken,
    onDone: OnDone,
    onError: OnError,
): () => void {
    return createSSEConnection(`${API_URL}${ENDPOINTS.GENERATE}`, payload, onToken, onDone, onError)
}
