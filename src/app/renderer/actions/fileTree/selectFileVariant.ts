import {SelectFileVariant} from '../../../../domain/useCases/fileTree/SelectFileVariant';
import {container} from '../../container';
import {confirmLeaveEditMode} from '../../helpers/confirmations/confirmLeaveEditMode';

const useCase: SelectFileVariant = container.get(SelectFileVariant);

export function selectFileVariant(basename: string, variantId: string): Promise<void> {
    return confirmLeaveEditMode(() => {
        return useCase.execute(basename, variantId);
    });
}