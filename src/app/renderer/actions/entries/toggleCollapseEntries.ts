import {ToggleCollapseEntries} from '../../../../domain/useCases/entries/ToggleCollapseEntries';
import {container} from '../../container';

const useCase: ToggleCollapseEntries = container.get(ToggleCollapseEntries);

export function toggleCollapseEntries(collapsed: boolean): Promise<void> {
    return useCase.execute(collapsed);
}