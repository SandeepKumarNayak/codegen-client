import { Link, useLocation } from '@tanstack/react-router'
import { useUIStore } from '@/stores/uiStore'
import Button from '@/components/common/Button'

export default function Header() {
    const { theme, toggleTheme } = useUIStore()
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-white/5 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
                    <span className="text-xl">⚡</span>
                </div>
                <div className="flex flex-col -space-y-1">
                    <span className="font-black text-gray-900 dark:text-gray-100 text-xl tracking-tighter">
                        CodeGen<span className="text-violet-600 dark:text-violet-400">AI</span>
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Live Preview</span>
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-1 p-1 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 transition-colors">
                {[
                    { label: 'Home', path: '/' },
                    { label: 'Dashboard', path: '/dashboard' },
                ].map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`px-4 py-1.5 text-sm font-bold rounded-xl transition-all duration-200 ${isActive(item.path)
                                ? 'bg-white dark:bg-gray-800 text-violet-600 dark:text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="w-10 h-10 p-0 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none"
                    title="Toggle theme"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </Button>
                <Link
                    to="/dashboard"
                    className="hidden sm:flex items-center px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/20 active:scale-95"
                >
                    Get Started
                </Link>
            </div>
        </header>
    )
}
