import {Reload} from '../../../domain/useCases/Reload';
import {container} from '../container';

const useCase: Reload = container.get(Reload);

export function reload(): Promise<void> {
    return useCase.execute();
}