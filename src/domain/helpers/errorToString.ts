export function errorToString(error: any): string | null | undefined {
    if (error == null) {
        return error;
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (Array.isArray(error)) {
        return error.map(errorToString).join(', ');
    }

    return error.toString();
}