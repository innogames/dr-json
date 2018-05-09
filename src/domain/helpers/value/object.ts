export function mapObj<T = any>(obj: T, fn: (value: any, prop: string) => any): T {
    let newObj: any = {};

    Object.keys(obj).forEach((prop: string) => {
        newObj[prop] = fn((obj as any)[prop], prop);
    });

    return newObj;
}

export function isNestedEmpty(value: any): boolean {
    if (value === null || value === undefined || value === '') {
        return true;
    }

    if (Array.isArray(value)) {
        return value.length == 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).reduce((isEmpty: boolean, prop: string): boolean => {
            if (!isEmpty) {
                return false;
            }

            return isNestedEmpty(value[prop]);
        }, true);
    }

    return false;
}