export function mapObj<T = any>(obj: T, fn: (value: any, prop: string) => any): T {
    let newObj: any = {};

    Object.keys(obj).forEach((prop: string) => {
        newObj[prop] = fn((obj as any)[prop], prop);
    });

    return newObj;
}
