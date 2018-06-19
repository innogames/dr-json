import {CollapseAllDirs} from '../../../../domain/useCases/fileTree/CollapseAllDirs';
import {container} from '../../container';

const useCase: CollapseAllDirs = container.get(CollapseAllDirs);

export function collapseAllDirs(): Promise<void> {
    return useCase.execute();
}