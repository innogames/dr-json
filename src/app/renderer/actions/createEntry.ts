import {DataEntry} from '../entities/editor/DataEntry';
import {dataRepo} from '../../../domain/repositories/DataRepo';
import {editorStore} from '../stores/editorStore';

export function createEntry(file: string, entry: DataEntry): Promise<void> {
    return new Promise((resolve) => {
        dataRepo.load(file)
            .then((entries: DataEntry[]) => dataRepo.save(file, [...entries, entry]))
            .then((entries: DataEntry[]) => {
                if (editorStore.currentFile) {
                    editorStore.currentFile.setEntries(entries);
                }
                resolve();
            });
    });
}
