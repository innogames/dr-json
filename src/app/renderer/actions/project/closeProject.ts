import {CloseProject} from '../../../../domain/useCases/project/CloseProject';
import {container} from '../../container';

const useCase: CloseProject = container.get(CloseProject);

export function closeProject(): Promise<void> {
    return useCase.execute();
}