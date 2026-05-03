export function sanitizeCode(code: string): string {
    // Block external script src attributes
    return code.replace(/<script\s+[^>]*src\s*=/gi, '<!-- blocked-script ')
}

export function isDangerous(code: string): boolean {
    return /\beval\s*\(|Function\s*\(\s*['"`]|document\.write\s*\(/.test(code)
}
