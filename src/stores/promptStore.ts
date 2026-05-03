import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Framework, StylingOption } from '@/types'
import { lsGet, lsSet } from '@/utils/localStorageManager'
import { LS_KEYS } from '@/utils/constants'

interface PromptState {
    prompt: string
    framework: Framework
    styling: StylingOption
    setPrompt: (p: string) => void
    setFramework: (f: Framework) => void
    setStyling: (s: StylingOption) => void
}

export const usePromptStore = create<PromptState>()(
    devtools((set) => ({
        prompt: lsGet<string>(LS_KEYS.LAST_PROMPT, ''),
        framework: lsGet<Framework>(LS_KEYS.FRAMEWORK, 'html'),
        styling: lsGet<StylingOption>(LS_KEYS.STYLING, 'css'),
        setPrompt: (prompt) => { set({ prompt }); lsSet(LS_KEYS.LAST_PROMPT, prompt) },
        setFramework: (framework) => { set({ framework }); lsSet(LS_KEYS.FRAMEWORK, framework) },
        setStyling: (styling) => { set({ styling }); lsSet(LS_KEYS.STYLING, styling) },
    }), { name: 'PromptStore' })
)
