import {CreateVariant} from '../../../../domain/useCases/variants/CreateVariant';
import {container} from '../../container';

const useCase: CreateVariant = container.get(CreateVariant);

export function createVariant(basename: string, variantId: string, copyEntries: boolean): Promise<void> {
    return useCase.execute(basename, variantId, copyEntries);
}