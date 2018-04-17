import {useCases} from '../../container';

export function openProject(projectFile: string): Promise<void> {
    return useCases.openProject.execute(projectFile);
}