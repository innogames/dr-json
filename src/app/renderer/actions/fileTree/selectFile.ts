import {SelectFile} from '../../../../domain/useCases/fileTree/SelectFile';
import {container} from '../../container';
import {confirmLeaveEditMode} from '../../helpers/confirmations/confirmLeaveEditMode';

const useCase: SelectFile = container.get(SelectFile);

export function selectFile(filename: string): Promise<void> {
    return confirmLeaveEditMode(() => {
        return useCase.execute(filename);
    });
}