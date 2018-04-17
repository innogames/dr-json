import {useCases} from '../../container';

export function createVariant(filename: string, variantId: string, copyEntries: boolean): Promise<void> {
    return useCases.createVariant.execute(filename, variantId, copyEntries);
}