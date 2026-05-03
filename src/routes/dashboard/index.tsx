import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '@/components/layout/Sidebar'
import PromptInput from '@/components/prompt/PromptInput'
import FrameworkSelector from '@/components/prompt/FrameworkSelector'
import PromptOptions from '@/components/prompt/PromptOptions'
import GenerateButton from '@/components/prompt/GenerateButton'
import CodeEditor from '@/components/editor/CodeEditor'
import PreviewPanel from '@/components/preview/PreviewPanel'
import { usePromptStore } from '@/stores/promptStore'
import type { Framework, StylingOption } from '@/types'

export const Route = createFileRoute('/dashboard/')({ component: DashboardPage })

function DashboardPage() {
    const { framework, styling, setFramework, setStyling } = usePromptStore()

    return (
        <div className="flex h-full overflow-hidden bg-gray-50 dark:bg-gray-950">
            {/* Left: Sidebar */}
            <Sidebar />

            {/* Left/Middle: Code Editor (Full Height) */}
            <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <div className="flex-1 p-4 overflow-hidden">
                    <CodeEditor />
                </div>
            </div>

            {/* Right: Preview (Top) + Prompt (Bottom) */}
            <div className="w-[45%] flex flex-col overflow-hidden">
                {/* Preview Panel */}
                <div className="flex-1 p-4 overflow-hidden">
                    <PreviewPanel />
                </div>

                {/* Prompt area */}
                <div className="flex flex-col gap-4 p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 flex-shrink-0">
                    <PromptInput />
                    <FrameworkSelector value={framework} onChange={(f: Framework) => setFramework(f)} />
                    <div className="flex items-center justify-between gap-4">
                        <PromptOptions value={styling} onChange={(s: StylingOption) => setStyling(s)} />
                    </div>
                    <GenerateButton />
                </div>
            </div>
        </div>
    )
}
