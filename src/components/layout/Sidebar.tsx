import { useUIStore } from '@/stores/uiStore'
import PromptHistory from '@/components/prompt/PromptHistory'

export default function Sidebar() {
    const { sidebarOpen, toggleSidebar } = useUIStore()
    return (
        <aside className={`flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-12'} h-full overflow-hidden`}>
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
                {sidebarOpen && <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">History</span>}
                <button
                    onClick={toggleSidebar}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-auto p-1 rounded transition-colors"
                    title="Toggle sidebar"
                >
                    {sidebarOpen ? '◀' : '▶'}
                </button>
            </div>
            {sidebarOpen && <div className="flex-1 overflow-y-auto"><PromptHistory /></div>}
        </aside>
    )
}
