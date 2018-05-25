import {CloseCreateVariant} from '../../../../domain/useCases/CloseCreateVariant';
import {container} from '../../container';

const useCase: CloseCreateVariant = container.get(CloseCreateVariant);

export function closeCreateVariant(): Promise<void> {
    return useCase.execute();
}