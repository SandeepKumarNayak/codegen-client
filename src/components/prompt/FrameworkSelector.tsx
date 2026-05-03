import { FRAMEWORKS } from '@/utils/constants'
import type { Framework } from '@/types'

interface Props { value: Framework; onChange: (f: Framework) => void }

export default function FrameworkSelector({ value, onChange }: Props) {
    return (
        <div className="grid grid-cols-4 gap-2">
            {FRAMEWORKS.map((f) => (
                <button
                    key={f.id}
                    onClick={() => onChange(f.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-medium transition-all duration-150 ${value === f.id
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-600/20 text-violet-700 dark:text-violet-300'
                            : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:border-violet-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                >
                    <span className="text-xl">{f.emoji}</span>
                    <span>{f.label}</span>
                </button>
            ))}
        </div>
    )
}
