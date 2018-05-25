import {CloseCreateEntry} from '../../../../domain/useCases/CloseCreateEntry';
import {container} from '../../container';

const useCase: CloseCreateEntry = container.get(CloseCreateEntry);

export function closeCreateEntry(): Promise<void> {
    return useCase.execute();
}