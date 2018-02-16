export function toInt(value: any): number {
    return parseInt(value, 10);
}

export function compareNumber(num1: number, num2: number): number {
    if (num1 < num2) {
        return -1;
    } else if (num1 > num2) {
        return 1;
    }

    return 0;
}