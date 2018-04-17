import {useCases} from '../../container';

export function closeCreateVariant(): Promise<void> {
    return useCases.closeCreateVariant.execute();
}