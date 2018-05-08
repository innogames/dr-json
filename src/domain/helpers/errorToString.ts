export function errorToString(error: any): string {
    if (error instanceof Error) {
        return `${error.message}\n\nStack Trace:\n${error.stack}`;
    } else {
        return error.toString();
    }
}