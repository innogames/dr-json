import {DataEntry} from '../../../domain/entities/editor/DataEntry';
import {dataRepo} from '../../../domain/repositories/dataRepo';
import {editorStore} from '../stores/editorStore';

export function updateEntry(file: string, entryId: string | null, newEntry: DataEntry): Promise<void> {
    return new Promise((resolve) => {
        dataRepo.load(file)
            .then((entries: DataEntry[]) => entries.map((e: DataEntry) => {
                return e.id == entryId ? newEntry : e;
            }))
            .then((entries: DataEntry[]) => dataRepo.save(file, entries))
            .then((entries: DataEntry[]) => {
                if (editorStore.currentFile) {
                    editorStore.currentFile.setEntries(entries);
                }
                resolve();
            });
    });
}
