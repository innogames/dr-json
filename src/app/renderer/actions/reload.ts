import {useCases} from '../container';

export function reload(): Promise<void> {
    return useCases.reload.execute();
}