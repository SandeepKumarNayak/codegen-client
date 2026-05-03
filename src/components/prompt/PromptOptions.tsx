import { STYLING_OPTIONS } from '@/utils/constants'
import type { StylingOption } from '@/types'

interface Props { value: StylingOption; onChange: (s: StylingOption) => void }

export default function PromptOptions({ value, onChange }: Props) {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 dark:text-gray-500 mr-1">Styling:</span>
            {STYLING_OPTIONS.map((o) => (
                <button
                    key={o.id}
                    onClick={() => onChange(o.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${value === o.id
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-600/20 text-violet-700 dark:text-violet-300'
                            : 'border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-transparent'
                        }`}
                >
                    {o.label}
                </button>
            ))}
        </div>
    )
}
