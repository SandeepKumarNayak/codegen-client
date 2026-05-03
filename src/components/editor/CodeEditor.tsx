import Editor, { loader, type OnMount } from '@monaco-editor/react'
import { useCodeStore } from '@/stores/codeStore'
import { useUIStore } from '@/stores/uiStore'
import { usePreviewStore } from '@/stores/previewStore'
import CopyButton from './CopyButton'
import CodeStats from './CodeStats'
import Spinner from '@/components/common/Spinner'
import Badge from '@/components/common/Badge'

export default function CodeEditor() {
    const { code, language, isGenerating, setCode } = useCodeStore()
    const { theme } = useUIStore()
    const executePreview = usePreviewStore((s) => s.executePreview)

    const download = () => {
        if (!code) return
        const ext: Record<string, string> = { html: 'html', javascript: 'js', jsx: 'jsx', typescript: 'ts', tsx: 'tsx', css: 'css' }
        const blob = new Blob([code], { type: 'text/plain' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `generated.${ext[language] ?? 'txt'}`
        a.click()
    }

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) setCode(value)
    }

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Configure TypeScript/TSX support
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.React,
            jsxFactory: 'React.createElement',
            reactNamespace: 'React',
            allowNonTsExtensions: true,
            allowJs: true,
            target: monaco.languages.typescript.ScriptTarget.Latest,
        });

        // Add React types for better IntelliSense (optional but helps with the errors)
        const reactTypes = `
            declare namespace React {
                interface HTMLAttributes<T> { className?: string; style?: any; children?: any; }
                interface DetailedHTMLProps<E, T> extends HTMLAttributes<T> {}
                function createElement(type: any, props?: any, ...children: any[]): any;
                type FC<P = {}> = (props: P) => any;
            }
            declare namespace JSX {
                interface IntrinsicElements {
                    [elemName: string]: any;
                }
            }
        `;
        monaco.languages.typescript.typescriptDefaults.addExtraLib(reactTypes, 'file:///node_modules/@types/react/index.d.ts');
    };

    // Map store language to Monaco language
    const monacoLang = language === 'tsx' || language === 'jsx' ? 'typescript' : language

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <Badge variant="primary">{language === 'tsx' ? 'TSX' : language.toUpperCase()}</Badge>
                    {isGenerating && (
                        <div className="flex items-center gap-2 text-xs text-violet-600 dark:text-violet-400">
                            <Spinner size="sm" /> Generating…
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <CodeStats />
                    <CopyButton />
                    <button
                        onClick={executePreview}
                        disabled={!code || isGenerating}
                        className="text-xs px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-300 dark:hover:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 transition-all disabled:opacity-40 font-medium flex items-center gap-1.5"
                    >
                        ▶ Run
                    </button>
                    <button
                        onClick={download}
                        disabled={!code}
                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-transparent transition-all disabled:opacity-40"
                    >
                        ↓ Download
                    </button>
                </div>
            </div>
            <div className="flex-1 relative bg-gray-50 dark:bg-gray-950">
                {!code && !isGenerating ? (
                    <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-700 text-sm">
                        Generated code will appear here…
                    </div>
                ) : (
                    <Editor
                        height="100%"
                        language={monacoLang}
                        value={code}
                        theme={theme === 'dark' ? 'vs-dark' : 'light'}
                        onChange={handleEditorChange}
                        onMount={handleEditorDidMount}
                        options={{
                            readOnly: isGenerating,
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 16, bottom: 16 },
                            fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
                            lineNumbers: 'on',
                            renderLineHighlight: 'all',
                            wordWrap: 'on',
                            formatOnPaste: true,
                            suggestOnTriggerCharacters: true
                        }}
                        loading={<div className="flex items-center justify-center h-full"><Spinner /></div>}
                    />
                )}
            </div>
        </div>
    )
}
