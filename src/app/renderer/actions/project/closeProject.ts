import {useCases} from '../../container';

export function closeProject(): Promise<void> {
    return useCases.closeProject.execute();
}