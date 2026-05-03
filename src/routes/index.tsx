import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-slate-50 dark:bg-gray-950 overflow-auto py-20 px-6 transition-colors duration-200">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-violet-600/10 border border-violet-500/20 text-violet-600 dark:text-violet-400">
                    ⚡ AI-Powered Code Generation
                </span>

                {/* Hero */}
                <div className="space-y-4">
                    <h1 className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-violet-800 to-violet-600 dark:from-gray-100 dark:via-violet-200 dark:to-violet-400 animate-slide-in">
                        CodeGen<span className="text-violet-600 dark:text-violet-400">AI</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        Describe any UI and watch it come to life — live preview, streaming code generation, zero setup.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {[
                        { icon: '🌊', title: 'Live Streaming', desc: 'Code streams token by token via SSE' },
                        { icon: '👁️', title: 'Live Preview', desc: 'Instant sandboxed iframe rendering' },
                        { icon: '📦', title: 'Multi-Framework', desc: 'HTML, React, Vue, Vanilla JS' },
                    ].map((f) => (
                        <div key={f.title} className="flex flex-col items-center gap-2 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm dark:shadow-none hover:border-violet-300 dark:hover:border-violet-900 transition-all duration-200">
                            <span className="text-3xl">{f.icon}</span>
                            <span className="font-bold text-gray-900 dark:text-gray-200">{f.title}</span>
                            <span className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">{f.desc}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/dashboard"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl text-lg transition-all duration-200 shadow-xl shadow-violet-200 dark:shadow-violet-900/40 hover:-translate-y-1"
                    >
                        Open Dashboard →
                    </Link>
                    <a href="https://github.com" target="_blank" className="w-full sm:w-auto px-10 py-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-bold rounded-2xl border border-gray-300 dark:border-gray-700 hover:border-violet-500 dark:hover:border-gray-500 transition-all text-lg flex items-center justify-center">
                        GitHub ↗
                    </a>
                </div>
            </div>
        </div>
    )
}
