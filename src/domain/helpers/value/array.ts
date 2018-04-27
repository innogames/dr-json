export function unique<T = any>(array: T[]): T[] {
    return array.filter((value: T, index: number, self: T[]) => {
        return self.indexOf(value) === index;
    });
}
