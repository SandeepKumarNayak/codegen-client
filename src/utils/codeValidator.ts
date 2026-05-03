export interface ValidationResult { valid: boolean; errors: string[] }

export function validateCode(code: string, language: string): ValidationResult {
    const errors: string[] = []
    if (!code.trim()) { errors.push('Code is empty'); return { valid: false, errors } }

    if (['html', 'jsx', 'tsx'].includes(language)) {
        const open = (code.match(/<[a-zA-Z][^/\s>]*[^/]>/g) ?? []).length
        const close = (code.match(/<\/[a-zA-Z]+>/g) ?? []).length
        if (Math.abs(open - close) > 5) errors.push('Possible unclosed HTML tags')
    }

    if (['javascript', 'typescript', 'jsx', 'tsx'].includes(language)) {
        const ob = (code.match(/{/g) ?? []).length
        const cb = (code.match(/}/g) ?? []).length
        if (ob !== cb) errors.push(`Unmatched braces: ${ob} open vs ${cb} close`)
    }

    return { valid: errors.length === 0, errors }
}
