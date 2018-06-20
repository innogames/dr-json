import {SelectFilter} from '../../../../domain/useCases/fileTree/SelectFilter';
import {container} from '../../container';

const useCase: SelectFilter = container.get(SelectFilter);

export function selectFilter(filter: string): Promise<void> {
    return useCase.execute(filter);
}