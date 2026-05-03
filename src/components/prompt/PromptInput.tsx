import { usePromptStore } from '@/stores/promptStore'
import { MAX_PROMPT_LENGTH } from '@/utils/constants'
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect } from 'react'

export default function PromptInput() {
    const { prompt, setPrompt } = usePromptStore()
    const debounced = useDebounce(prompt, 500)

    useEffect(() => { void debounced }, [debounced])

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Prompt</label>
                <span className={`text-xs ${prompt.length > MAX_PROMPT_LENGTH * 0.9 ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-600'}`}>
                    {prompt.length}/{MAX_PROMPT_LENGTH}
                </span>
            </div>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.slice(0, MAX_PROMPT_LENGTH))}
                placeholder="Describe the UI you want to build… e.g. 'A responsive hero section with gradient background and CTA button'"
                rows={4}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 text-sm px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors leading-relaxed shadow-sm"
            />
        </div>
    )
}
