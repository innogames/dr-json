export function errorToString(error: any): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (Array.isArray(error)) {
        return error.map(errorToString).join(', ');
    }

    return error.toString();
}