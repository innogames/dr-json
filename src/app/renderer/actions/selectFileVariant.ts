import {useCases} from '../container';

export function selectFileVariant(filename: string, variantId: string): Promise<void> {
    return useCases.selectFileVariant.execute(filename, variantId);
}