import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Spinner from './Spinner'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    icon?: ReactNode
}

const base = 'inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
const variants = {
    primary: 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-200 dark:shadow-violet-900/30',
    secondary: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600',
    ghost: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800',
    danger: 'bg-red-50 dark:bg-red-600/20 hover:bg-red-100 dark:hover:bg-red-600/30 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/30',
}
const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' }

export default function Button({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...rest }: Props) {
    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || loading} {...rest}>
            {loading ? <Spinner size="sm" /> : icon}
            {children}
        </button>
    )
}
