import {ToggleCollapseDir} from '../../../../domain/useCases/fileTree/ToggleCollapseDir';
import {container} from '../../container';

const useCase: ToggleCollapseDir = container.get(ToggleCollapseDir);

export function toggleCollapseDir(basename: string): Promise<void> {
    return useCase.execute(basename);
}