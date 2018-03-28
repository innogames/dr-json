export function replaceVariantIdProps(variantId: string, props: any): string {
    Object.keys(props).forEach((prop: string) => {
        variantId = variantId.replace(`{${prop}}`, props[prop]);
    });

    return variantId;
}