import {DataEntry} from '../entities/editor/DataEntry';
import {normalizeEntry} from '../functions/domain/normalizeEntry';
import {readData} from '../functions/domain/readData';
import {saveData} from '../functions/domain/saveData';
import {editorStore} from '../stores/editorStore';

export function updateEntry(file: string, entryId: string | null, newEntry: DataEntry): Promise<void> {
    return new Promise((resolve) => {
        newEntry = normalizeEntry(newEntry);

        readData(file)
            .then((entries: DataEntry[]) => entries.map((e: DataEntry) => {
                return e.id == entryId ? newEntry : e;
            }))
            .then((entries: DataEntry[]) => saveData(file, entries))
            .then((entries: DataEntry[]) => {
                if (editorStore.currentFile) {
                    editorStore.currentFile.setEntries(entries);
                }
                resolve();
            });
    });
}
