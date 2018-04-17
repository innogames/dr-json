import {useCases} from '../../container';

export function openCreateVariant(): Promise<void> {
    return useCases.openCreateVariant.execute();
}