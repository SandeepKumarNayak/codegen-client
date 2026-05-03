import { Component, type ErrorInfo, type ReactNode } from 'react'

interface State { hasError: boolean; message: string }
interface Props { children: ReactNode; fallback?: ReactNode }

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, message: '' }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, message: error.message }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('[ErrorBoundary]', error, info)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-red-600 dark:text-red-400 bg-white dark:bg-gray-950 p-6">
                    <span className="text-4xl">💥</span>
                    <p className="text-sm font-medium">Preview crashed</p>
                    <p className="text-xs text-red-500 text-center">{this.state.message}</p>
                    <button
                        onClick={() => this.setState({ hasError: false, message: '' })}
                        className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                    >
                        Try again
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}
