import {CloseEditEntry} from '../../../../domain/useCases/entries/CloseEditEntry';
import {container} from '../../container';

const useCase: CloseEditEntry = container.get(CloseEditEntry);

export function closeEditEntry(): Promise<void> {
    return useCase.execute();
}