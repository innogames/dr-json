import {OpenCreateVariant} from '../../../../domain/useCases/variants/OpenCreateVariant';
import {container} from '../../container';

const useCase: OpenCreateVariant = container.get(OpenCreateVariant);

export function openCreateVariant(): Promise<void> {
    return useCase.execute();
}