import {remote} from 'electron';
import {EntryId} from '../entities/editor/DataEntry';
import {deleteEntry} from './deleteEntry';

export function confirmDeleteEntry(filename: string, entryId: EntryId) {
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
                deleteEntry(filename, entryId);
            }
        },
    );
}