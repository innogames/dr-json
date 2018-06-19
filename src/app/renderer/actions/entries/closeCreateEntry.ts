import {CloseCreateEntry} from '../../../../domain/useCases/entries/CloseCreateEntry';
import {container} from '../../container';

const useCase: CloseCreateEntry = container.get(CloseCreateEntry);

export function closeCreateEntry(): Promise<void> {
    return useCase.execute();
}