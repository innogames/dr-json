import {OpenProject} from '../../../../domain/useCases/project/OpenProject';
import {container} from '../../container';

const useCase: OpenProject = container.get(OpenProject);

export function openProject(projectFile: string): Promise<void> {
    return useCase.execute(projectFile);
}