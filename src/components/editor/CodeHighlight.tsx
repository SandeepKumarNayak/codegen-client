import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import 'prismjs/themes/prism-tomorrow.css'

interface Props { code: string; language: string }

export default function CodeHighlight({ code, language }: Props) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (ref.current) Prism.highlightElement(ref.current)
    }, [code, language])

    const lang = language === 'jsx' || language === 'tsx' ? language : (language === 'javascript' ? 'js' : language)

    return (
        <pre className="m-0 overflow-auto h-full bg-transparent text-sm leading-relaxed">
            <code ref={ref} className={`language-${lang}`}>{code}</code>
        </pre>
    )
}
