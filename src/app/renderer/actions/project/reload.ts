import {Reload} from '../../../../domain/useCases/project/Reload';
import {container} from '../../container';
import {confirmLeaveEditMode} from '../../helpers/confirmations/confirmLeaveEditMode';

const useCase: Reload = container.get(Reload);

export function reload(): Promise<void> {
    return confirmLeaveEditMode(() => {
        return useCase.execute();
    });
}