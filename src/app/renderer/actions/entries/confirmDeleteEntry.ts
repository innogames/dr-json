import {dialog} from '@electron/remote';
import {EntryId} from '../../../../domain/states/objects/editor/DataEntry';
import {DeleteEntry} from '../../../../domain/useCases/entries/DeleteEntry';
import {container} from '../../container';

const useCase: DeleteEntry = container.get(DeleteEntry);

export function confirmDeleteEntry(dataFile: string, entryId: EntryId) {
    dialog.showMessageBox(
        {
            type:      'warning',
            title:     'Delete entry',
            message:   `Do you really want to delete "${entryId}"?`,
            buttons:   ['No', 'Yes'],
            cancelId:  0,
            defaultId: 1,
        },
    ).then(result => {
      if (result.response == 1) {
        useCase.execute(dataFile, entryId);
      }
    });
}
