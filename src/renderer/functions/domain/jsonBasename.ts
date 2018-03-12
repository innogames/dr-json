import {REGEX_JSON_OR_SCHEMA_FILE} from '../../config/constants';

export function jsonBasename(file: string): string {
    return file.replace(REGEX_JSON_OR_SCHEMA_FILE, '');
}