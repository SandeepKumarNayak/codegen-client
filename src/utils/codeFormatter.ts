export function formatCode(code: string): string {
    return code
        .replace(/\r\n/g, '\n').replace(/\r/g, '\n')
        .split('\n').map(l => l.trimEnd()).join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim() + '\n'
}

export function getLanguageFromFramework(framework: string): string {
    const map: Record<string, string> = { html: 'html', react: 'jsx', vue: 'html', vanilla: 'javascript' }
    return map[framework] ?? 'html'
}
