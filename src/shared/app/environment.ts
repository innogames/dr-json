export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

export function isMacOS(): boolean {
    return process.platform === 'darwin';
}
