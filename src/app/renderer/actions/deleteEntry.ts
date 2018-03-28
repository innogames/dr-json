import {dataRepo} from '../../../domain/repositories/dataRepo';
import {DataEntry} from '../../../domain/entities/editor/DataEntry';
import {editorStore} from '../stores/editorStore';

export function deleteEntry(file: string, entryId: string): Promise<void> {
    return new Promise((resolve) => {
        dataRepo.load(file)
            .then((entries: DataEntry[]) => entries.filter((entry: DataEntry) => {
                return entry.id != entryId;
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
