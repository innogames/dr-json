import {useCases} from '../container';

export function selectFileVariant(basename: string, variantId: string): Promise<void> {
    return useCases.selectFileVariant.execute(basename, variantId);
}