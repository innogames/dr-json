import {SchemaValidationError} from '@/entities/json/SchemaValidationError';

export function errorToString(error: any): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (error instanceof SchemaValidationError) {
        return `${error.dataPath} ${error.message}`.substr(1).trim();
    }

    if (Array.isArray(error)) {
        return error.map(errorToString).join(', ');
    }

    return error.toString();
}