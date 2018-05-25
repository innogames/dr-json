import {remote} from 'electron';
import {EntryId} from '../../../../domain/states/objects/editor/DataEntry';
import {DeleteEntry} from '../../../../domain/useCases/DeleteEntry';
import {container} from '../../container';

const useCase: DeleteEntry = container.get(DeleteEntry);

export function confirmDeleteEntry(dataFile: string, entryId: EntryId) {
    remote.dialog.showMessageBox(
        {
            type:      'warning',
            title:     'Delete entry',
            message:   `Do you really want to delete "${entryId}"?`,
            buttons:   ['No', 'Yes'],
            cancelId:  0,
            defaultId: 1,
        },
        (buttonId: number) => {
            if (buttonId == 1) {
                useCase.execute(dataFile, entryId);
            }
        },
    );
}