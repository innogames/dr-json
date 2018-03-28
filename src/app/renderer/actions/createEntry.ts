import {dataRepo} from '../../../domain/repositories/dataRepo';
import {DataEntry} from '../../../domain/entities/editor/DataEntry';
import {normalizeEntry} from '../../../domain/data/normalizeEntry';
import {editorStore} from '../stores/editorStore';

export function createEntry(file: string, entry: DataEntry): Promise<void> {
    return new Promise((resolve) => {
        entry = normalizeEntry(entry);

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
