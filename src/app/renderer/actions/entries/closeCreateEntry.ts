import {useCases} from '../../container';

export function closeCreateEntry(): Promise<void> {
    return useCases.closeCreateEntry.execute();
}