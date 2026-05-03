export default function Footer() {
    const footerLinks = [
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'Documentation', href: '#' },
        { label: 'Privacy', href: '#' },
    ]

    return (
        <footer className="w-full border-t border-gray-200 dark:border-white/5 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm px-6 py-8 transition-colors duration-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">⚡</span>
                        <span className="font-black text-gray-900 dark:text-gray-100 text-lg tracking-tight">
                            CodeGen<span className="text-violet-600 dark:text-violet-400">AI</span>
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Build beautiful UIs with the power of streaming AI.</p>
                </div>

                <div className="flex items-center gap-8">
                    {footerLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-xs font-extra-bold text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors uppercase tracking-wider"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <p className="text-[10px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-widest">
                    © 2026 Antigravity
                </p>
            </div>
        </footer>
    )
}
