import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    prefix?: string
}

export default function Input({ label, error, prefix, className = '', id, ...rest }: Props) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={inputId} className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>}
            <div className="relative flex items-center">
                {prefix && <span className="absolute left-3 text-gray-400 dark:text-gray-500 text-sm select-none">{prefix}</span>}
                <input
                    id={inputId}
                    className={`w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors ${prefix ? 'pl-8' : 'pl-3'} pr-3 py-2 shadow-sm dark:shadow-none ${className}`}
                    {...rest}
                />
            </div>
            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    )
}
