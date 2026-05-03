export type OnToken = (token: string) => void
export type OnDone = () => void
export type OnError = (err: Error) => void

export function createSSEConnection(
    url: string,
    payload: object,
    onToken: OnToken,
    onDone: OnDone,
    onError: OnError,
): () => void {
    const controller = new AbortController()

    const run = async () => {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
                body: JSON.stringify(payload),
                signal: controller.signal,
            })

            if (!res.ok) throw new Error(`Server error ${res.status}`)
            if (!res.body) throw new Error('No response body')

            const reader = res.body.getReader()
            const decoder = new TextDecoder()
            let buffer = ''

            while (true) {
                const { done, value } = await reader.read()
                if (done) { onDone(); break }
                buffer += decoder.decode(value, { stream: true })
                const lines = buffer.split('\n')
                buffer = lines.pop() ?? ''

                for (const line of lines) {
                    if (!line.startsWith('data:')) continue
                    const data = line.slice(5).trim()
                    if (!data) continue

                    try {
                        const parsed = JSON.parse(data) as { type: string; data: string }
                        
                        switch (parsed.type) {
                            case 'token':
                                if (parsed.data) onToken(parsed.data)
                                break
                            case 'done':
                                onDone()
                                return
                            case 'error':
                                throw new Error(parsed.data || 'Generation failed')
                        }
                    } catch (e) {
                        // If it's not JSON, it might be the raw token or [DONE] if the server format changes
                        if (data === '[DONE]') {
                            onDone()
                            return
                        }
                        console.error('[SSE] Parse Error:', e, data)
                    }
                }
            }
        } catch (err) {
            if ((err as Error).name !== 'AbortError') onError(err as Error)
        }
    }

    run()
    return () => controller.abort()
}
