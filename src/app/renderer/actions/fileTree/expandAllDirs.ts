import {ExpandAllDirs} from '../../../../domain/useCases/fileTree/ExpandAllDirs';
import {container} from '../../container';

const useCase: ExpandAllDirs = container.get(ExpandAllDirs);

export function expandAllDirs(): Promise<void> {
    return useCase.execute();
}