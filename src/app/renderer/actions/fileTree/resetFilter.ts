import {container} from '../../container';
import {ResetFilter} from '../../../../domain/useCases/fileTree/ResetFilter';

const useCase: ResetFilter = container.get(ResetFilter);

export function resetFilter(): Promise<void> {
    return useCase.execute();
}