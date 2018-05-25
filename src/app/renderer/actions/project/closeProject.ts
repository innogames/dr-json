import {CloseProject} from '../../../../domain/useCases/CloseProject';
import {container} from '../../container';

const useCase: CloseProject = container.get(CloseProject);

export function closeProject(): Promise<void> {
    return useCase.execute();
}