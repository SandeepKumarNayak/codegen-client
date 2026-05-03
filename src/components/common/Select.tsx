import type { SelectHTMLAttributes } from 'react'

interface Option { value: string; label: string }
interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    options: Option[]
}

export default function Select({ label, options, className = '', id, ...rest }: Props) {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={selectId} className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>}
            <select
                id={selectId}
                className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors cursor-pointer shadow-sm dark:shadow-none ${className}`}
                {...rest}
            >
                {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
        </div>
    )
}
