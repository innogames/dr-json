export function jsonBasename(file: string): string {
    return file.replace(/(\.schema)*\.json$/, '');
}