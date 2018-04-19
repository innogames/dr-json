import {useCases} from '../../container';

export function createVariant(basename: string, variantId: string, copyEntries: boolean): Promise<void> {
    return useCases.createVariant.execute(basename, variantId, copyEntries);
}