type Variant = 'default' | 'primary' | 'success' | 'warning' | 'danger'
interface Props { children: React.ReactNode; variant?: Variant; className?: string }

const variants: Record<Variant, string> = {
    default: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    primary: 'bg-violet-100 dark:bg-violet-600/20 text-violet-700 dark:text-violet-300 border border-violet-300 dark:border-violet-500/30',
    success: 'bg-green-100 dark:bg-green-600/20 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-500/30',
    warning: 'bg-yellow-100 dark:bg-yellow-600/20 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-500/30',
    danger: 'bg-red-100 dark:bg-red-600/20 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/30',
}

export default function Badge({ children, variant = 'default', className = '' }: Props) {
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    )
}
