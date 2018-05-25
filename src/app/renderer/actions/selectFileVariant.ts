import {SelectFileVariant} from '../../../domain/useCases/SelectFileVariant';
import {container} from '../container';

const useCase: SelectFileVariant = container.get(SelectFileVariant);

export function selectFileVariant(basename: string, variantId: string): Promise<void> {
    return useCase.execute(basename, variantId);
}